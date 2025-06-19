import { useEditorAppStore } from "@editorAppStore";
import BaseSubmitButton from "@/components/baseFormItems/BaseSubmitButton";
import { cn } from "@/lib/utils";

export default function SubmitButton() {
	const { safeFormData } = useEditorAppStore();
	const isSelected =
		safeFormData.selectedFieldId === "submit-button" &&
		!safeFormData.selectedFieldSetId;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		safeFormData.setSelectedFieldId("submit-button");
		safeFormData.setSelectedFieldSetId(null);
	};

	return (
		<div
			className={cn("border-2 border-dotted border-transparent", {
				"border-blue-500": isSelected,
				"hover:border-blue-500/50": !isSelected,
			})}
			onClick={handleClick}
		>
			<BaseSubmitButton />
		</div>
	);
}
