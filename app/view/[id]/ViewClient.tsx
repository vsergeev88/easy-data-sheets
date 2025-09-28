"use client";

import type { DataSheet } from "@/lib/data/dataSheets";

import { useViewAppStore } from "@viewAppStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import FormView from "../components/FormView";

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
		<div className="h-screen bg-gray-50 py-2 pl-2 md:py-10">
			<div className="h-full overflow-auto pb-6">
				<FormView />
				<div className="mt-2 flex w-full justify-center">
					<a className="text-center text-gray-500 text-xs" href="/">
						Powered by EasyDataSheets.com
					</a>
				</div>
			</div>
		</div>
	);
}

export default observer(ViewClient);
