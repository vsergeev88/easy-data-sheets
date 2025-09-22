import { useEditorAppStore } from "@editorAppStore";
import { Plus } from "lucide-react";

export default function AddFieldsetButton({
	fieldSetId = null,
}: {
	fieldSetId?: string | null;
}) {
	const { safeFormData } = useEditorAppStore();
	return (
		<button
			type="button"
			className="flex items-center gap-2 cursor-pointer w-full border-2 border-dashed border-gray-200 hover:border-gray-300 p-2 text-lg font-medium text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200"
			onClick={() => safeFormData.addEmptyFieldSet(fieldSetId)}
		>
			<Plus className="w-4 h-4" />
			<span className="">New Section</span>
		</button>
	);
}
