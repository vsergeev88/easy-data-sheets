import { Copy, DiamondPlus, QrCode } from "lucide-react";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEditorAppStore } from "@/app/editor/hooks/useEditorAppStore";
import { Button } from "@/components/ui/button";

const PublishSettings = () => {
	const {
		safeFormData,
		safeFormInfo,
		shouldShowShareOptions,
		setShouldShowShareOptions,
	} = useEditorAppStore();

	reaction(
		() => safeFormData.selectedFieldId,
		(newSelectedFieldId) => {
			if (newSelectedFieldId) {
				setShouldShowShareOptions(false);
			}
		}
	);

	return (
		<div className="">
			<div className="mb-2 text-right text-xs opacity-50">
				Last saved: {safeFormInfo.updatedAt?.toLocaleString() ?? "never"}
			</div>
			<div className="flex justify-end">
				<Button
					className=" text-xs"
					onClick={() => setShouldShowShareOptions(!shouldShowShareOptions)}
					variant="link"
				>
					{shouldShowShareOptions ? "Hide share options" : "Show share options"}
				</Button>
			</div>
			{shouldShowShareOptions && (
				<div className="flex w-full flex-wrap items-center gap-2">
					<Button className="flex-1" variant="outline">
						<Copy /> Copy Link
					</Button>
					<Button className="flex-1" variant="outline">
						<DiamondPlus /> Embed in website
					</Button>
					<Button className="flex-1" variant="outline">
						<QrCode /> Download QR code
					</Button>
				</div>
			)}
		</div>
	);
};

export default observer(PublishSettings);
