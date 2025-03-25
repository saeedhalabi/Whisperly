interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="block text-xs mx-auto mt-2 w-full bg-indigo-500 text-white font-semibold py-3 rounded-full shadow-2xl hover:bg-indigo-300 transition cursor-pointer tracking-wide">
      {text}
    </button>
  );
};

export default Button;
