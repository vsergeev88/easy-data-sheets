import { Eye, Monitor, Smartphone } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { useEditorAppStore } from "../../hooks/useEditorAppStore";

const PreviewButton = () => {
	const [open, setOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const { save, isSaving, safeFormInfo } = useEditorAppStore();

	const handlePreview = async () => {
		await save();
		setOpen(true);
	};

	return (
		<>
			<Tooltip message="Preview data sheet">
				<Button
					className=""
					disabled={isSaving}
					onClick={handlePreview}
					variant="outline"
				>
					<Eye /> Preview
				</Button>
			</Tooltip>
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogContent className="z-[9999] min-h-[90vh] min-w-[90vw] grid-cols-[1fr] grid-rows-[auto_1fr] gap-0">
					<DialogHeader className="flex flex-row items-center justify-between px-4 py-2">
						<DialogTitle>Preview Datasheet</DialogTitle>
						<div className="flex items-center gap-2">
							<Tooltip message="Mobile view">
								<Button
									className={cn(isMobile && "bg-gray-300")}
									onClick={() => setIsMobile(true)}
									size="sm"
									variant="outline"
								>
									<Smartphone />
								</Button>
							</Tooltip>
							<Tooltip message="Desktop view">
								<Button
									className={cn(!isMobile && "bg-gray-300")}
									onClick={() => setIsMobile(false)}
									size="sm"
									variant="outline"
								>
									<Monitor />
								</Button>
							</Tooltip>
						</div>
					</DialogHeader>
					<div
						className={cn(
							"h-full",
							isMobile &&
								"m-auto max-h-[600px] w-[340px] overflow-hidden rounded-3xl border-2 border-gray-500 bg-gray-300 p-1.5"
						)}
					>
						<iframe
							className="size-full rounded-2xl"
							src={`/view/${safeFormInfo.id}?demo=true`}
							title="Preview Datasheet"
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
export default observer(PreviewButton);
