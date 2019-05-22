export type FormFieldNames<FormFields> = { [K in keyof Required<FormFields>]: K };
export interface ISelectOption<T extends string | number = string | number> {
  value: T;
  label: string;
}
