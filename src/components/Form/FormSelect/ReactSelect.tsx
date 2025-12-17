import Select from "react-select";
import type { ControllerRenderProps } from "react-hook-form";

export type SelectOption = {
  label: string;
  value: string | number;
};

type BaseProps = {
  options: SelectOption[];
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
};

type RHFProps = {
  field: ControllerRenderProps<any, any>;
  value?: never;
  onChange?: never;
  className?: string;
};

type ControlledProps = {
  field?: never;
  className?: string;
  value: SelectOption | null;
  onChange: (option: SelectOption | null) => void;
};

type AppSelectProps = BaseProps & (RHFProps | ControlledProps);

export default function ReactSelect({
  options,
  placeholder = "انتخاب کنید",
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  ...props
}: AppSelectProps) {
  /** حالت RHF */
  if ("field" in props) {
    const { field } = props;

    const selectedOption =
      options.find((opt) => opt.value === field?.value) ?? null;

    return (
      <Select
        options={options}
        value={selectedOption}
        onChange={(opt) => field?.onChange(opt?.value ?? null)}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isRtl
        classNamePrefix="simple-select"
        className={`rounded-md ${props.className}`}
        loadingMessage={() => "در حال بارگذاری..."}
        noOptionsMessage={({ inputValue }) =>
          inputValue ? "نتیجه‌ای پیدا نشد" : "گزینه‌ای وجود ندارد"
        }
      />
    );
  }

  /** حالت Controlled */
  return (
    <Select
      options={options}
      value={props.value}
      onChange={props.onChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isRtl
      classNamePrefix="simple-select"
      className={`rounded-md ${props.className}`}
      loadingMessage={() => "در حال بارگذاری..."}
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "نتیجه‌ای پیدا نشد" : "گزینه‌ای وجود ندارد"
      }
    />
  );
}
