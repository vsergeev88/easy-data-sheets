import { create } from "zustand";
import { ConfirmDialogProps } from "@/components/ConfirmDialog";

type ConfirmDialogStore = {
	open: boolean;
	dialogProps: ConfirmDialogProps;
	setOpen: (open: boolean) => void;
};

const defaultDialogProps: ConfirmDialogProps = {
	title: "",
	description: "",
	onConfirm: () => {},
	onCancel: () => {},
};

export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => {
	return {
		open: false,
		dialogProps: defaultDialogProps,
		setOpen: (open: boolean) => set({ open }),
	};
});

export const confirmDialogManager = {
	open: (dialogProps: ConfirmDialogProps) => {
		useConfirmDialogStore.setState((state) => ({
			...state,
			open: true,
			dialogProps,
		}));
	},
	close: () => {
		useConfirmDialogStore.setState((state) => ({
			...state,
			open: false,
			dialogProps: defaultDialogProps,
		}));
	},
};
