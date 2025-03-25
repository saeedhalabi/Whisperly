type text = {
  title: string;
};

const Title = ({ title }: text) => {
  return <h1 className="text-center font-medium text-[#14142B] p-5">{title}</h1>;
};

export default Title;
