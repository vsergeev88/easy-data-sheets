import type React from "react";
import type { IBareChoiceFieldModel } from "@/app/stores/bareStores/fields/bareChoiceFieldModel";

import { observer } from "mobx-react-lite";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CHOICE_TYPES } from "@/lib/types/form";

import CustomField from "./CustomField";

type BaseChoiceFieldProps = {
	field: IBareChoiceFieldModel;
};

const BaseChoiceField: React.FC<BaseChoiceFieldProps> = ({ field }) => {
	if (field.choiceType === CHOICE_TYPES.CHECKBOX) {
		return (
			<div className="flex w-full flex-col space-y-2 bg-white px-2 py-2">
				{field.items.map((item) => (
					<div
						className="flex w-full flex-row items-start space-x-3 space-y-0"
						key={item}
					>
						<Checkbox
							checked={field.value?.includes(item)}
							id={field.id + item}
							onCheckedChange={(checked) => {
								return checked
									? field.setValue([...field.value, item])
									: field.setValue(
											field.value?.filter((value: string) => value !== item)
										);
							}}
						/>
						<Label className="font-normal text-sm" htmlFor={field.id + item}>
							{item}
						</Label>
					</div>
				))}
				{field.withCustomField && (
					<CustomField
						onAddOtherValue={(otherValue) => {
							field.addItem(otherValue);
							field.setValue([...field.value, otherValue]);
						}}
					/>
				)}
			</div>
		);
	}

	return (
		<RadioGroup
			className="flex w-full flex-col gap-2 bg-white px-2 py-2"
			defaultValue={field.items[0]}
			onValueChange={(value) => {
				field.setValue([value]);
			}}
		>
			{field.items.map((item) => {
				return (
					<div className="flex items-center space-x-2" key={item}>
						<RadioGroupItem id={field.id + item} value={item} />
						<Label className="font-normal text-sm" htmlFor={field.id + item}>
							{item}
						</Label>
					</div>
				);
			})}
			{field.withCustomField && (
				<CustomField
					onAddOtherValue={(otherValue) => {
						field.addItem(otherValue);
						field.setValue([otherValue]);
					}}
				/>
			)}
		</RadioGroup>
	);
};
export default observer(BaseChoiceField);
