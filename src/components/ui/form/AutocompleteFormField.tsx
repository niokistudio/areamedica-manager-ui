import {
  Autocomplete,
  AutocompleteItem,
  type AutocompleteProps,
} from "@heroui/autocomplete"
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { OptionalLabel } from "@/components/ui/form/OptionalLabel"
import type { FormFieldOption } from "@/types/form"

interface AutocompleteFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<AutocompleteProps, "children"> {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  options: FormFieldOption[]
  optional?: boolean
}

export function AutocompleteFormField<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  options,
  optional,
  ...props
}: AutocompleteFormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          size="sm"
          errorMessage={fieldState.error?.message}
          isInvalid={fieldState.invalid}
          defaultSelectedKey={field.value}
          onSelectionChange={field.onChange}
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
            <AutocompleteItem key={option.value}>
              {option.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
    />
  )
}
