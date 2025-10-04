import { Copy, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const ResponseField = ({
	field,
}: {
	field: { name: string; value: string | string[]; notes?: string };
}) => {
	const value = Array.isArray(field.value)
		? field.value.join("; ")
		: field.value;

	const [isNotesEditing, setIsNotesEditing] = useState(false);
	const [notes, setNotes] = useState(field.notes ?? "");
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		}
	}, [isCopied]);

	return (
		<div className=" border-t py-1">
			<div className="flex justify-between gap-2">
				<div className="flex flex-1 items-center gap-2">
					<div className="font-thin text-sm">{field.name}:</div>{" "}
					{
						<div
							className={cn(
								"flex items-center gap-2 font-semibold",
								!value && "text-gray-400"
							)}
						>
							<div>{value || "N/A"} </div>
							<Button
								className="size-4 text-slate-400 text-xs"
								disabled={!value}
								onClick={() => {
									navigator.clipboard.writeText(value);
									setIsCopied(true);
								}}
								size="icon"
								variant="ghost"
							>
								<Copy className="size-3" />
							</Button>
							{isCopied && (
								<div className="flex animate-bounce items-center gap-1 font-normal text-slate-400 text-xs">
									copied!
								</div>
							)}
						</div>
					}
				</div>
				<div className="flex flex-col items-center gap-2 text-slate-400 print:hidden">
					<Button
						onClick={() => setIsNotesEditing(true)}
						size="sm"
						variant="ghost"
					>
						<Pencil /> Add notes
					</Button>
				</div>
			</div>
			{isNotesEditing && (
				<div className="flex flex-1 items-center gap-2">
					<Textarea
						autoFocus
						className="bg-white"
						onBlur={() => setIsNotesEditing(false)}
						onChange={(e) => setNotes(e.target.value)}
						placeholder="Add notes"
						value={notes}
					/>
				</div>
			)}
			{notes && !isNotesEditing && (
				<div
					className="flex flex-1 items-center gap-2 rounded-sm bg-slate-100 p-1 pl-2"
					onClick={() => setIsNotesEditing(true)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setIsNotesEditing(true);
						}
					}}
				>
					<Pencil className="size-3 text-slate-400" />
					<div className="font-thin text-sm">{notes}</div>
				</div>
			)}
		</div>
	);
};
