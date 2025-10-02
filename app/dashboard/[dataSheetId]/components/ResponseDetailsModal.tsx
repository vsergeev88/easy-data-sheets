import type { DataSheetResponse } from "@/lib/data/datasheetResponses";

import { Copy, MessageSquareMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { ResponseField } from "./ResponseField";

const ResponseDetailsModal = ({
	response,
	openDetailsModal,
	setOpenDetailsModal,
}: {
	response: DataSheetResponse | null | undefined;
	openDetailsModal: boolean;
	setOpenDetailsModal: (open: boolean) => void;
}) => {
	return (
		<Dialog onOpenChange={setOpenDetailsModal} open={openDetailsModal}>
			<DialogContent className="min-h-[90vh] min-w-[90vw] grid-cols-[1fr] grid-rows-[auto_1fr] gap-0">
				<DialogHeader>
					<DialogTitle>Response Details</DialogTitle>
				</DialogHeader>
				{!response?.data && <div className="grid gap-4">No data</div>}
				<div className="overflow-y-auto py-4">
					{JSON.parse(response?.data ?? "[]").map(
						(
							fieldset: {
								legend: string;
								fields: { name: string; value: string | string[] }[];
							},
							fieldsetIndex: number
						) => (
							<div className="bg-gray-50 p-2" key={fieldsetIndex}>
								<h2 className="font-bold text-lg">{fieldset.legend}</h2>
								{fieldset.fields.map((field, fieldIndex) => (
									<ResponseField field={field} key={fieldIndex} />
								))}
							</div>
						)
					)}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Print</Button>
					</DialogClose>
					<Button type="button">Save as PDF</Button>
					<Button type="button">Share</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ResponseDetailsModal;
