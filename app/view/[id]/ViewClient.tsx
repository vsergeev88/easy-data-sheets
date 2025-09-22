import { useViewAppStore } from "@viewAppStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import type { DataSheet } from "@/lib/data/dataSheets";
import FormView from "../components/FormView/FormView";

export type ViewClientProps = {
	dataSheet: DataSheet;
};

function ViewClient({ dataSheet }: ViewClientProps) {
	const viewAppStore = useViewAppStore();

	useEffect(() => {
		if (!viewAppStore.isInitialized) {
			viewAppStore.init(dataSheet);
		}
	}, [viewAppStore, dataSheet]);

	if (!viewAppStore.isInitialized) {
		return null;
	}

	return (
		<div className="grid h-full grid-cols-[280px_1fr_340px] overflow-hidden xl:grid-cols-[280px_1fr_400px]">
			<div className="overflow-hidden bg-gray-50 py-4 pl-2">
				<div className="h-full overflow-auto pb-6">
					<FormView />
				</div>
			</div>
		</div>
	);
}

export default observer(ViewClient);
