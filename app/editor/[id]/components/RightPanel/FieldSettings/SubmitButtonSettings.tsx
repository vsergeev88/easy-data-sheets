import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SubmitButtonSettings = () => {
  const { safeFormData } = useEditorAppStore();

  console.log('safeFormData', safeFormData);

  const submitButton = safeFormData.submitButton;

  return <div>
    <Label htmlFor="label" className="text-sm font-medium">
      Label
    </Label>
    <Input id="label" value={submitButton?.label} onChange={(e) => submitButton?.setLabel(e.target.value)} />
  </div>;
};

export default observer(SubmitButtonSettings);