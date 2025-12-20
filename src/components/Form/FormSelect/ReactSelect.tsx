import Select, { type CSSObjectWithLabel } from "react-select";
import type { ControllerRenderProps } from "react-hook-form";
import clsx from "clsx";

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
  hasError?: boolean;
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
  hasError,
  className,
  ...props
}: AppSelectProps) {
  /** حالت RHF */
  const style = {
    menuPortal: (base: CSSObjectWithLabel) => ({ ...base, zIndex: 9999 }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      whiteSpace: "nowrap",
      overflow: "hidden",
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
  };
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
        styles={style}
        isRtl
        classNamePrefix="simple-select"
        className={clsx("rounded-md", className, {
          "!border !border-danger": hasError,
        })}
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
      styles={style}
      classNamePrefix="simple-select"
      className={clsx("rounded-md", className, {
        "!border !border-danger": hasError,
      })}
      loadingMessage={() => "در حال بارگذاری..."}
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "نتیجه‌ای پیدا نشد" : "گزینه‌ای وجود ندارد"
      }
    />
  );
}
