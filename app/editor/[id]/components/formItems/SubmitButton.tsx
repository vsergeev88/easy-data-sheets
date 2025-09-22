import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";

import BaseSubmitButton from "@/components/baseFormItems/BaseSubmitButton";
import { cn } from "@/lib/utils";

function SubmitButton() {
	const { safeFormData } = useEditorAppStore();
	const isSelected =
		safeFormData.selectedFieldId === "submit-button" &&
		!safeFormData.selectedFieldSetId;

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		safeFormData.setSelectedFieldId("submit-button");
		safeFormData.setSelectedFieldSetId(null);
	};

	return (
		<div
			className={cn(
				"ignore-deselect border-2 border-transparent border-dotted",
				{
					"border-blue-500": isSelected,
					"hover:border-blue-500/50": !isSelected,
				}
			)}
		>
			<BaseSubmitButton
				label={safeFormData.submitButton?.label}
				onSubmit={handleClick}
			/>
		</div>
	);
}

export default observer(SubmitButton);
