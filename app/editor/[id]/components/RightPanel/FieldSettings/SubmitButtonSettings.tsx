import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";
import { Input } from "@/components/ui/input";

const SubmitButtonSettings = () => {
  const { safeFormData } = useEditorAppStore();

  console.log('safeFormData', safeFormData);

  const submitButton = safeFormData.submitButton;

  return <div>
    <Input value={submitButton?.label} onChange={(e) => submitButton?.setLabel(e.target.value)} />
  </div>;
};

export default observer(SubmitButtonSettings);