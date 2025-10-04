import { redirect } from "next/navigation";

import { contactsFieldset } from "@/app/editor/constants/fieldsetTemplates";
import { Button } from "@/components/ui/button";
import { createDataSheet } from "@/lib/data/dataSheets";

export const CreateNewDataSheetButton: React.FC<{
	userId: string;
	companyId?: string | null;
	className?: string;
}> = ({ userId, companyId = null, className }) => {
	const createNewDataSheet = async () => {
		"use server";
		const dataSheet = await createDataSheet("My Data Sheet", {
			description: "My Data Sheet Description",
			userId,
			companyId,
			fieldSets: [contactsFieldset],
		});

		redirect(`/editor/${dataSheet.id}`);
	};
	return (
		<Button className={className} onClick={createNewDataSheet}>
			Create new Data Sheet
		</Button>
	);
};
