import { observer } from "mobx-react-lite";
import { useEditorAppStore } from "@/app/editor/hooks/useEditorAppStore";
import { Button } from "@/components/ui/button";

const PublishSettings = () => {
  const { safeFormData, safeFormInfo } = useEditorAppStore();
  return (
    <div className="">
      <div className="mb-2 text-xs text-right opacity-50">
        Last published: {safeFormInfo.updatedAt?.toLocaleString() ?? 'never'}
      </div>
    </div>
  );
};

export default observer(PublishSettings);