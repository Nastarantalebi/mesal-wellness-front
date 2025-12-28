import { useState } from "react";

type AccessSwitchProps = {
  defaultChecked?: boolean;
  onChange?: (isOn: boolean) => void;
  label?: string;
};

const AccessSwitch: React.FC<AccessSwitchProps> = ({
  defaultChecked = false,
  onChange,
  label,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    setChecked(!checked);
    onChange?.(!checked);
  };

  return (
    <div
      className="flex items-center space-x-3 mb-2  bg-gray-200 rounded-md justify-between p-2"
      dir="rtl">
      {label && <span className="text-sm font-medium">{label}</span>}
      <button
        onClick={toggle}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out
          ${
            checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
          }`}>
        <div className="w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ease-in-out" />
      </button>
    </div>
  );
};
export default AccessSwitch;
