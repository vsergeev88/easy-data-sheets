import { Button } from "@/components/ui/button";

type BaseSubmitButtonProps = {
	label?: string;
	onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function BaseSubmitButton({
	label = "Submit",
	onSubmit,
}: BaseSubmitButtonProps) {
	return (
		<div className="flex justify-end">
			<Button onClick={onSubmit} size="lg" type="submit">
				{label}
			</Button>
		</div>
	);
}
