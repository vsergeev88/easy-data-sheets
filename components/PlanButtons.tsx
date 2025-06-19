"use client";

import { useState } from "react";

type PlanButtonsProps = {
	updateUserPlan: (plan: string) => Promise<void>;
	currentPlan: string | null;
};

export default function PlanButtons({
	updateUserPlan,
	currentPlan,
}: PlanButtonsProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleSetPlan = async (plan: string) => {
		setIsLoading(true);
		try {
			await updateUserPlan(plan);
			// Optionally show a success message (consider a more robust notification system)
			alert(`Plan updated to ${plan}!`);
		} catch (error) {
			console.error("Error setting plan:", error);
			// Optionally show an error message
			alert("Failed to update plan.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div>
				<h2>Free</h2>
				<p>Free plan for personal use</p>
				<button
					onClick={() => handleSetPlan("free")}
					disabled={isLoading || currentPlan === "free"}
				>
					{currentPlan === "free" ? "Current Plan" : "Choose Free"}
				</button>
			</div>
			<div>
				<h2>Pro</h2>
				<p>Pro plan for professional use</p>
				<button
					onClick={() => handleSetPlan("pro")}
					disabled={isLoading || currentPlan === "pro"}
				>
					{currentPlan === "pro" ? "Current Plan" : "Choose Pro"}
				</button>
			</div>
		</>
	);
}
