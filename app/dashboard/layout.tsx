import { auth } from "@clerk/nextjs/server";

import { CreateNewDataSheetButton } from "@/components/CreateNewDataSheetButton";
import { HeaderNavigationItems } from "@/components/HeaderNavigationItmes";
import { TheFooter } from "@/components/TheFooter";
import { TheHeader } from "@/components/TheHeader";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = await auth();
	const companyId = null as string | null;
	if (!userId) {
		return null;
	}

	return (
		<>
			<TheHeader>
				<HeaderNavigationItems />
				<CreateNewDataSheetButton
					className="ml-auto"
					companyId={companyId}
					userId={userId}
				/>
			</TheHeader>
			{children}
			<TheFooter />
		</>
	);
}
