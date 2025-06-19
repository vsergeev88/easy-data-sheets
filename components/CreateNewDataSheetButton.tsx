import { Button } from "@/components/ui/button";
import { createDataSheet } from "@/lib/data/dataSheets";
import { redirect } from "next/navigation";

export const CreateNewDataSheetButton: React.FC<{
	userId: string;
	companyId?: string | null;
}> = ({ userId, companyId = null }) => {
	const createNewDataSheet = async () => {
		"use server";
		const dataSheet = await createDataSheet("My Data Sheet", {
			description: "My Data Sheet Description",
			userId: userId,
			companyId: companyId,
			public: false,
			private: false,
			data: {},
		});

		redirect(`/editor/${dataSheet.id}`);
	};
	return <Button onClick={createNewDataSheet}>Create new Data Sheet</Button>;
};
