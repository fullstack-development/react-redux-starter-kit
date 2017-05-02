type FieldValue = string | number | {[key: string]: any};
interface IProps {
  type?: string;
  component?: string;
  order?: number;
  name?: string;
  required?: boolean;

  'enum'?: string[];
  label?: string;
  pattern?: string;
  placeholder?: string;

  errors?: string[];

  onChange?: (value: FieldValue, errors: string[]) => void;
}

export { FieldValue, IProps };
