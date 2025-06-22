import { Copy, DiamondPlus, Download, QrCode } from "lucide-react";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEditorAppStore } from "@/app/editor/hooks/useEditorAppStore";
import { Button } from "@/components/ui/button";

const PublishSettings = () => {
  const { safeFormData, safeFormInfo, shouldShowShareOptions, setShouldShowShareOptions } = useEditorAppStore();

  reaction(() => safeFormData.selectedFieldId, (newSelectedFieldId) => {
    if (newSelectedFieldId) {
      setShouldShowShareOptions(false);
    }
  });

  return (
    <div className="">
      <div className="mb-2 text-xs text-right opacity-50">
        Last published: {safeFormInfo.updatedAt?.toLocaleString() ?? 'never'}
      </div>
      <div className="flex justify-end">
        <Button variant="link" className=" text-xs" onClick={() => setShouldShowShareOptions(!shouldShowShareOptions)}>
          {shouldShowShareOptions ? "Hide share options" : "Show share options"}
        </Button>
      </div>
      {shouldShowShareOptions &&
        <div className="flex flex-wrap w-full items-center gap-2">
          <Button variant="outline" className="flex-1"> <Copy /> Copy Link</Button>
          <Button variant="outline" className="flex-1"> <DiamondPlus /> Embed in website</Button>
          <Button variant="outline" className="flex-1"> <QrCode /> Download QR code</Button>
        </div>
      }
    </div>
  );
};

export default observer(PublishSettings);