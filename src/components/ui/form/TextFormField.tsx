import { Input, type InputProps } from "@heroui/input"
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { OptionalLabel } from "@/components/ui/form/OptionalLabel"

interface TextFormFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends InputProps {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  optional?: boolean
}

export function TextFormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  optional,
  ...props
}: TextFormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          // variant="underlined"
          size="sm"
          // labelPlacement="outside"
          errorMessage={fieldState.error?.message}
          isInvalid={fieldState.invalid}
          {...field}
          {...props}
          className="placeholder:text-muted-foreground"
          label={
            optional ? (
              <OptionalLabel>{props.label}</OptionalLabel>
            ) : (
              props.label
            )
          }
        />
      )}
    />
  )
}
