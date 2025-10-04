import {
	SignedIn,
	SignedOut,
	// CreateOrganization,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";

import { MainLogo } from "@/components/MainLogo";

export const TheHeader = ({ children }: { children?: React.ReactNode }) => {
	return (
		<header className="flex h-16 items-center justify-between gap-4 p-4 shadow-xs">
			<MainLogo />
			<div className="flex w-full items-center justify-center gap-4 text-center">
				{children}
			</div>
			<div className="flex items-center gap-4">
				<SignedOut>
					<SignInButton />
					<SignUpButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</header>
	);
};
