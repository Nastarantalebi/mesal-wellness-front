import type { FieldValues, Path } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
export type TColumns = {
  label: string;
  sortable: boolean;
  filterable: boolean;
  visible: boolean;
  type: string;
};

export type TPaginate = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  has_more: boolean;
};

export type TOption = {
  label: string;
  value: string | number | boolean;
  children?: TOption[] | null;
};

export type TFormData<T extends FieldValues> = {
  name: Path<T> | "separator" | "empty";
  label?: string;
  placeholder?: string;
  type?:
    | "select"
    | "treeSelect"
    | "checkbox"
    | "switch"
    | "radio"
    | "date"
    | "month"
    | "time"
    | "textWithAlignment"
    | "textArea"
    | "upload"
    | "image"
    | "tags"
    | null;
  // You can add any other prop that your custom components might need
  option?: TOption[];
  mode?: "single" | "multiple";
  money?: boolean;
  required?: boolean;
  className?: string;
  popupClassName?: string;
  isLoading?: boolean;
  onValue?: number | boolean | string;
  offValue?: number | boolean | string;
  dir?: "rtl" | "ltr";
  // value?: string | boolean | number;
  readOnly?: boolean;
  text?: string;
  more?: boolean;
  inputType?: "text" | "number" | "password" | "email" | "tel";
  onChangeSelect?: (
    value?:
      | (string | number | boolean)
      | (string | number | boolean)[]
      | undefined,
    option?: TOption | TOption[]
  ) => void;
  // onChange?: (value: string) => void;
  showTimePicker?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  maxDate?: DateObject | null;
  minDate?: DateObject | null;
  mask?: string;
  inputClassName?: string;
  inFiscalYear?: boolean;
  info?: string;
  format?: string;
  onSearch?: (query: string) => void;
  defaultLabel?: string;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  autoFocus?: boolean;
  medium_url?: string;
  original_url?: string;
  portal?: boolean;
  // maxSelectDate?: DateObject | null;
  // onClick?: MouseEventHandler<HTMLButtonElement>;
  // prefix?: ReactNode;
};
