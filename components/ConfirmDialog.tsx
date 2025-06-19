"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
	confirmDialogManager,
	useConfirmDialogStore,
} from "@/app/stores/confirmDialogStore";

export type ConfirmDialogProps = {
	title: string;
	description: string;
	onConfirm: () => void;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
	variant?: "default" | "destructive";
};

export default function ConfirmDialog() {
	const { open, dialogProps } = useConfirmDialogStore();
	const {
		title,
		description,
		onConfirm,
		onCancel,
		confirmText = "Confirm",
		cancelText = "Cancel",
		variant = "default",
	} = dialogProps;

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => !isOpen && confirmDialogManager.close()}
		>
			<DialogTrigger />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							onCancel?.();
							confirmDialogManager.close();
						}}
					>
						{cancelText}
					</Button>
					<Button
						type="button"
						variant={variant}
						onClick={() => {
							onConfirm();
							confirmDialogManager.close();
						}}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
