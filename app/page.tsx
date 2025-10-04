import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const { userId } = await auth();

	if (userId) {
		redirect("/dashboard/responses");
	}

	return (
		<div>
			An easy-to-use solution for creating and managing technical questionnaires
			to streamline the process of gathering critical data from potential
			customers in industrial sectors.
		</div>
	);
}
