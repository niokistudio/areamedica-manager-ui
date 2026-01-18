"use client"

import { DatePicker, type DatePickerProps } from "@heroui/date-picker"
import type { DateValue } from "@internationalized/date"
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { OptionalLabel } from "@/components/ui/form/OptionalLabel"

interface DatePickerFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<DatePickerProps, "value" | "onChange" | "defaultValue"> {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  optional?: boolean
}

export function DatePickerFormField<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  optional,
  ...props
}: DatePickerFormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          size="sm"
          errorMessage={fieldState.error?.message}
          isInvalid={fieldState.invalid}
          value={field.value as DateValue | null}
          onChange={field.onChange}
          {...props}
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