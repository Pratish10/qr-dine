import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type Control, type FieldValues, type Path } from 'react-hook-form';

interface FormInputFieldProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	placeholder: string;
	control: Control<T>;
	disabled: boolean;
	type: string;
}

const FormInputField = <T extends FieldValues>({ name, label, placeholder, control, disabled, type }: FormInputFieldProps<T>): JSX.Element => (
	<FormField
		control={control}
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Input {...field} placeholder={placeholder} type={type} disabled={disabled} />
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default FormInputField;
