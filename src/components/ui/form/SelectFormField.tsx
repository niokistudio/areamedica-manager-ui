import { Select, SelectItem, type SelectProps } from "@heroui/select"
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { OptionalLabel } from "@/components/ui/form/OptionalLabel"
import type { FormFieldOption } from "@/types/form"

interface SelectFormFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<SelectProps, "children"> {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  options: FormFieldOption[]
  optional?: boolean
}

export function SelectFormField<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  options,
  optional,
  ...props
}: SelectFormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          // variant="underlined"
          size="sm"
          // labelPlacement="outside"
          errorMessage={fieldState.error?.message}
          isInvalid={fieldState.invalid}
          defaultSelectedKeys={field.value ? [field.value] : undefined}
          {...field}
          {...props}
          label={
            optional ? (
              <OptionalLabel>{props.label}</OptionalLabel>
            ) : (
              props.label
            )
          }
        >
          {options.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  )
}
