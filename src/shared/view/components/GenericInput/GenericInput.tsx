type FieldValue = string | number | { [key: string]: any };
interface IProps {
  type?: string;
  component?: string;
  order?: number;
  name?: string;
  required?: boolean;

  enum?: string[];
  label?: string;
  pattern?: string;
  placeholder?: string;

  error?: string;

  onChange?: (value: FieldValue, error: string) => void;
}

export { FieldValue, IProps };
