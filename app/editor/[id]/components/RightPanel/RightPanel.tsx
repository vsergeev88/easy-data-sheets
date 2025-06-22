import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";
import { FieldSettings } from "./FieldSettings/";

const RightPanel = () => {
	const { safeFormData } = useEditorAppStore();

	console.log("safeFormData", safeFormData.selectedFieldId);

	return (
		<div className="h-full py-4 px-2 ignore-deselect">
			<FieldSettings fieldId={safeFormData.selectedFieldId} />
		</div>
	);
};

export default observer(RightPanel);
