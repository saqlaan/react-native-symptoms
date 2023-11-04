export interface IFormInput {
  placeholder?: string;
  label?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  helperText?: string;
  onChange: (date: string) => void;
  isEnabled: boolean;
}
