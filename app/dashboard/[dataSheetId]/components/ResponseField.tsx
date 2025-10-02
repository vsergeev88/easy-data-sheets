import { Copy, MessageSquareMore, Pencil } from "lucide-react";
import { useState } from "react";

import { EditableText } from "@/components/EditableText";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const ResponseField = ({
	field,
}: {
	field: { name: string; value: string | string[]; notes: string };
}) => {
	const value = Array.isArray(field.value)
		? field.value.join("; \n")
		: field.value;

	const [isNotesEditing, setIsNotesEditing] = useState(false);
	const [notes, setNotes] = useState(field.notes);

	return (
		<div className=" border-b py-1">
			<div className="flex justify-between gap-2">
				<div className="flex flex-1 items-center gap-2">
					<div className="font-thin text-sm">{field.name}:</div>{" "}
					{
						<div className={cn("font-semibold", !value && "text-gray-400")}>
							{value || "N/A"}
						</div>
					}
				</div>
				<div className="flex flex-col items-center gap-2 text-slate-400">
					<Tooltip message="Copy value">
						<Button
							disabled={!value}
							onClick={() => navigator.clipboard.writeText(value)}
							size="icon"
							variant="ghost"
						>
							<Copy />
						</Button>
					</Tooltip>
					<Tooltip message="Add notes for this response">
						<Button
							onClick={() => setIsNotesEditing(true)}
							size="icon"
							variant="ghost"
						>
							<MessageSquareMore />
						</Button>
					</Tooltip>
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
