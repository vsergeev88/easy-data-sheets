import { useContext } from "react";
import { ViewAppStoreContext } from "@/app/view/stores/viewAppStore";

export const useViewAppStore = () => {
	const store = useContext(ViewAppStoreContext);
	if (!store) {
		throw new Error(
			"useViewAppStore must be used within a ViewAppStoreContext"
		);
	}
	return store;
};
