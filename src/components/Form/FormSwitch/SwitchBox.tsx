import clsx from "clsx";
import type { ControllerRenderProps } from "react-hook-form";

type BaseProps = {
  label?: string;
  disabled?: boolean;
  className?: string;
};

type RHFProps = {
  field: ControllerRenderProps<any, any>;
  value?: never;
  onChange?: never;
};

type ControlledProps = {
  field?: never;
  value: boolean;
  onChange: (value: boolean) => void;
};

export type SwitchBoxProps = BaseProps & (RHFProps | ControlledProps);

export default function SwitchBox({
  label,
  disabled = false,
  className,
  ...props
}: SwitchBoxProps) {
  const isChecked =
    "field" in props ? Boolean(props.field?.value) : props.value;

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isChecked;

    if ("field" in props) {
      props.field?.onChange(newValue);
    } else {
      props.onChange(newValue);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between p-2 rounded-md",
        className,
        {
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
      dir="rtl">
      {/* {label && <span className="text-sm font-medium">{label}</span>} */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          "relative w-14 h-7 flex items-center rounded-full p-1 transition-all",
          isChecked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
        )}>
        <span className="w-5 h-5 bg-white rounded-full shadow-md transition-transform" />
      </button>
    </div>
  );
}
