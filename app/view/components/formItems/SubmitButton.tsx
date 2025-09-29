import { useViewAppStore } from "@viewAppStore";
import { observer } from "mobx-react-lite";

import BaseSubmitButton from "@/components/baseFormItems/BaseSubmitButton";

function SubmitButton() {
	const { safeFormData, submitDatasheet } = useViewAppStore();

	return (
		<BaseSubmitButton
			label={safeFormData.submitButton?.label}
			onSubmit={submitDatasheet}
		/>
	);
}

export default observer(SubmitButton);
