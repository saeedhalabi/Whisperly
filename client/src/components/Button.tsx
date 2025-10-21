import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
  text: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ text, type = "button", disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="block text-xs mx-auto mt-2 w-full bg-indigo-500 text-white font-semibold py-3 rounded-full shadow-2xl hover:bg-indigo-400 transition cursor-pointer tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {text}
      <FontAwesomeIcon
        icon={faArrowRightToBracket}
        className="ml-2 translate-y-0.3"
      />
    </button>
  );
};

export default Button;
