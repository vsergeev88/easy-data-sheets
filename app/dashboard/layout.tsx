import { TheFooter } from "@/components/TheFooter";
import { TheHeader } from "@/components/TheHeader";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<TheHeader />
			{children}
			<TheFooter />
		</>
	);
}
