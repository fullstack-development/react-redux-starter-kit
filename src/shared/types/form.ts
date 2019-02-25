export type FormFieldNames<FormFields> = {[K in keyof Required<FormFields>]: K};
