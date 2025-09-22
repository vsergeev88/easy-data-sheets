"use client";

import {
	ViewAppStoreContext,
	viewAppStore,
} from "../stores/viewAppStore/viewAppStore";
import ViewClient, { type ViewClientProps } from "./ViewClient";

export const ViewClientApp = ({ dataSheet }: ViewClientProps) => {
	if (!dataSheet) {
		return <div>No data sheet</div>;
	}
	return (
		<ViewAppStoreContext.Provider value={viewAppStore}>
			<ViewClient dataSheet={dataSheet} />
		</ViewAppStoreContext.Provider>
	);
};
