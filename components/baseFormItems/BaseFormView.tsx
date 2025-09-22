type BaseFormViewProps = {
	children: React.ReactNode;
};

export default function BaseFormView({ children }: BaseFormViewProps) {
	return (
		<div className="mx-auto max-w-[980px] space-y-4 border-1 border-gray-200 bg-white p-4">
			{children}
		</div>
	);
}
