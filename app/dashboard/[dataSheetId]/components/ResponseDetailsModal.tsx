import type { DataSheetResponse } from "@/lib/data/datasheetResponses";

import { Download, Printer } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { generateResponsePDF } from "@/lib/utils/pdf";

import { ResponseField } from "./ResponseField";

// Константа для проверки кириллических символов
const CYRILLIC_REGEX = /[а-яёА-ЯЁ]/;

const ResponseDetailsModal = ({
	response,
	openDetailsModal,
	setOpenDetailsModal,
}: {
	response: DataSheetResponse | null | undefined;
	openDetailsModal: boolean;
	setOpenDetailsModal: (open: boolean) => void;
}) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

	const handleSaveAsPDF = async () => {
		if (!response) {
			toast.error("No response data to export");
			return;
		}

		setIsGeneratingPDF(true);

		try {
			// Отладочная информация
			const parsedData = response.data ? JSON.parse(response.data) : null;
			// eslint-disable-next-line no-console
			console.log("Response data for PDF:", {
				id: response.id,
				createdAt: response.createdAt,
				data: response.data,
				parsedData,
			});

			// Дополнительная отладка для кириллических символов
			if (parsedData) {
				// eslint-disable-next-line no-console
				console.log("Checking for Cyrillic in fields:");
				parsedData.forEach(
					(
						fieldset: {
							legend: string;
							fields: Array<{ name: string; value: string | string[] }>;
						},
						index: number
					) => {
						// eslint-disable-next-line no-console
						console.log(`Fieldset ${index}:`, fieldset.legend);
						fieldset.fields.forEach(
							(
								field: { name: string; value: string | string[] },
								fieldIndex: number
							) => {
								const hasCyrillic = CYRILLIC_REGEX.test(String(field.value));
								// eslint-disable-next-line no-console
								console.log(
									`  Field ${fieldIndex} "${field.name}": "${field.value}" (has cyrillic: ${hasCyrillic})`
								);
							}
						);
					}
				);
			}

			// Используем специализированную функцию для генерации PDF из данных ответа
			await generateResponsePDF(
				{
					id: response.id,
					createdAt: response.createdAt.toString(),
					data: response.data ?? "[]",
				},
				{
					filename: `response-${response.id}-${new Date().toISOString().split("T")[0]}.pdf`,
				}
			);

			toast.success("PDF файл успешно сохранен!");
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("PDF generation error:", error);
			toast.error("Ошибка при создании PDF файла");
		} finally {
			setIsGeneratingPDF(false);
		}
	};

	const handlePrint = () => {
		window.print();
	};
	return (
		<Dialog onOpenChange={setOpenDetailsModal} open={openDetailsModal}>
			<DialogContent className="min-h-[90vh] min-w-[90vw] grid-cols-[1fr] grid-rows-[auto_1fr] gap-0 print:m-0 print:min-w-[100vw] print:p-0">
				<DialogHeader className="print:hidden">
					<DialogTitle>{response?.datasheetName}</DialogTitle>
				</DialogHeader>
				{!response?.data && <div className="grid gap-4">No data</div>}
				<div
					className="overflow-y-auto py-4 print:visible print:w-[100vw] print:overflow-x-visible print:overflow-y-visible print:py-0"
					id="pdf-content"
					ref={contentRef}
				>
					<h1 className="mb-2 hidden font-bold text-xl print:block">
						{response?.datasheetName}
					</h1>

					{JSON.parse(response?.data ?? "[]").map(
						(
							fieldset: {
								legend: string;
								fields: { name: string; value: string | string[] }[];
							},
							fieldsetIndex: number
						) => (
							<div
								className="bg-gray-50 p-2 print:bg-white print:p-0"
								key={`fieldset-${fieldsetIndex}-${fieldset.legend}`}
							>
								<h2 className="font-semibold text-lg">{fieldset.legend}</h2>
								{fieldset.fields.map((field, fieldIndex) => (
									<ResponseField
										field={field}
										key={`field-${fieldsetIndex}-${fieldIndex}-${field.name}`}
									/>
								))}
							</div>
						)
					)}
				</div>
				<DialogFooter className="print:hidden">
					<Button
						className="flex items-center gap-2"
						onClick={handlePrint}
						variant="outline"
					>
						<Printer className="h-4 w-4" />
						Print
					</Button>
					<Button
						className="flex items-center gap-2"
						disabled={isGeneratingPDF}
						onClick={handleSaveAsPDF}
						type="button"
					>
						<Download className="h-4 w-4" />
						{isGeneratingPDF ? "Generating PDF..." : "Save as PDF"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ResponseDetailsModal;
