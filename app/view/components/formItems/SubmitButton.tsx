import { useViewAppStore } from "@viewAppStore";
import { observer } from "mobx-react-lite";

import BaseSubmitButton from "@/components/baseFormItems/BaseSubmitButton";
import { cn } from "@/lib/utils";

function SubmitButton() {
	const { safeFormData, submitDatasheet } = useViewAppStore();

	return (
		<div className={cn("ignore-deselect")}>
			<BaseSubmitButton
				label={safeFormData.submitButton?.label}
				onSubmit={submitDatasheet}
			/>
		</div>
	);
}

export default observer(SubmitButton);
