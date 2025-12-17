import Select from "react-select";
import type { ControllerRenderProps } from "react-hook-form";

export type SelectOption = {
  label: string;
  value: string | number | boolean;
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
  onChange?: (option: SelectOption | null) => void;
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
        menuPortalTarget={document.body}
        menuPosition="fixed"
        options={options}
        value={selectedOption}
        onChange={(opt) => field?.onChange(opt?.value ?? null)}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isDisabled={isDisabled}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
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
      menuPortalTarget={document.body}
      menuPosition="fixed"
      options={options}
      value={props.value}
      onChange={props.onChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isRtl
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      classNamePrefix="simple-select"
      className={`rounded-md ${props.className}`}
      loadingMessage={() => "در حال بارگذاری..."}
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "نتیجه‌ای پیدا نشد" : "گزینه‌ای وجود ندارد"
      }
    />
  );
}
