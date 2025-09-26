import ConfirmDialog from "@/components/ConfirmDialog";
import { TheFooter } from "@/components/TheFooter";
import { TheHeader } from "@/components/TheHeader";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<TheHeader />
			{/* <SignedIn>
            <CreateOrganization />
          </SignedIn> */}
			<main className="overflow-hidden bg-white">{children}</main>
			<TheFooter />
			<Toaster />
			<ConfirmDialog />
		</>
	);
}
