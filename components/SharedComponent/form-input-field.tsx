import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { type Control, type FieldValues, type Path } from 'react-hook-form';

interface FormInputFieldProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	placeholder: string;
	control: Control<T>;
	disabled: boolean;
}

const FormInputField = <T extends FieldValues>({ name, label, placeholder, control, disabled }: FormInputFieldProps<T>): React.JSX.Element => (
	<FormField
		control={control}
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Input {...field} placeholder={placeholder} type={name} disabled={disabled} />
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default FormInputField;
