type props = {
  text: string;
  classname?: string;
  onClick?: () => void;
};

const Button = ({ text, onClick, classname }: props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#f35742] hover:bg-[#c93824] my-3 px-5 rounded-md text-white font-bold mr-5 cursor-pointer ${classname}`}
    >
      {text}
    </button>
  );
};

export default Button;
