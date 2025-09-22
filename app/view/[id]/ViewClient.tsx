"use client";

import type { DataSheet } from "@/lib/data/dataSheets";

import { useViewAppStore } from "@viewAppStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import FormView from "../components/FormView/FormView";

export type ViewClientProps = {
	dataSheet: DataSheet;
};

function ViewClient({ dataSheet }: ViewClientProps) {
	console.log("==== >>> dataSheet", dataSheet);
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
		<div className="h-full overflow-hidden bg-gray-50 py-4 pl-2">
			<div className="h-full overflow-auto pb-6">
				<FormView />
			</div>
		</div>
	);
}

export default observer(ViewClient);
