import { useEditorAppStore } from "@editorAppStore";
import { Eye, Save } from "lucide-react";
import { observer } from "mobx-react-lite";

import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import FieldSettings from "./FieldSettings";
import PublishSettings from "./PublishSettings";

const RightPanel = () => {
	const { safeFormData, save, isSaving, safeFormInfo } = useEditorAppStore();

	return (
		<div className="ignore-deselect h-full px-2 py-4">
			<div className="mb-2 flex items-center justify-center gap-2">
				<Dialog>
					<DialogTrigger>
						<Tooltip message="Preview data sheet">
							<Button className="" disabled={isSaving} variant="outline">
								<Eye /> Preview
							</Button>
						</Tooltip>
					</DialogTrigger>
					<DialogContent className="min-h-[90vh] min-w-[90vw]">
						<DialogHeader className="h-10 border-b">
							<DialogTitle>Preview Datasheet</DialogTitle>
							{/* <DialogDescription>
								
							</DialogDescription> */}
						</DialogHeader>
						<div className="h-full">
							<iframe
								className="size-full"
								src={`/view/${safeFormInfo.id}`}
								title="Preview Datasheet"
							/>
						</div>
					</DialogContent>
				</Dialog>

				<Button
					className="flex-1"
					disabled={isSaving}
					onClick={() => save()}
					variant="default"
				>
					<Save /> Save
				</Button>
			</div>
			{safeFormData.selectedFieldId ? (
				<FieldSettings fieldId={safeFormData.selectedFieldId} />
			) : (
				<PublishSettings />
			)}
		</div>
	);
};

export default observer(RightPanel);
