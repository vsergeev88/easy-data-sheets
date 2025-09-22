import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";
import BaseSubmitButton from "@/components/baseFormItems/BaseSubmitButton";
import { cn } from "@/lib/utils";

function SubmitButton() {
	const { safeFormData } = useEditorAppStore();
	const isSelected =
		safeFormData.selectedFieldId === "submit-button" &&
		!safeFormData.selectedFieldSetId;

	const handleClick = (
		e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
	) => {
		e.preventDefault();
		e.stopPropagation();
		safeFormData.setSelectedFieldId("submit-button");
		safeFormData.setSelectedFieldSetId(null);
	};

	return (
		<div
			className={cn(
				"border-2 border-dotted border-transparent ignore-deselect",
				{
					"border-blue-500": isSelected,
					"hover:border-blue-500/50": !isSelected,
				}
			)}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					handleClick(e);
				}
			}}
		>
			<BaseSubmitButton label={safeFormData.submitButton?.label} />
		</div>
	);
}

export default observer(SubmitButton);
