import { ChangeEvent } from "react";

interface InputProps {
  type: string;
  label: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

const InputField = ({
  type,
  label,
  value,
  name,
  onChange,
  autoComplete,
}: InputProps) => {
  return (
    <section className="flex flex-col">
      <label className="text-sm font-semibold text-gray-900 mb-0.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full px-4 py-2 text-gray-700 bg-white border border-[#d9dbe9] rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 drop-shadow-xs"
        required
      />
    </section>
  );
};

export default InputField;
