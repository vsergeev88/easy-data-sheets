import { Button } from "@/components/ui/button";

export default function BaseSubmitButton({ label = "Submit" }: { label?: string }) {
	return (
		<div className="flex justify-end">
			<Button type="submit" size="lg">
				{label}
			</Button>
		</div>
	);
}
