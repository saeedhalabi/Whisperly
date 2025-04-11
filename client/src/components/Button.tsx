import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="block text-xs mx-auto mt-2 w-full bg-indigo-500 text-white font-semibold py-3 rounded-full shadow-2xl hover:bg-indigo-400 transition cursor-pointer tracking-wide">
      {text}
      <FontAwesomeIcon
        icon={faArrowRightToBracket}
        className="ml-2 translate-y-0.3"
      />
    </button>
  );
};

export default Button;
