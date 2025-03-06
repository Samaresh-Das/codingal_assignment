import Logo from "../assets/logo.png";
import Timer from "./Timer";

const Navbar = () => {
  return (
    <nav>
      <div className=" flex flex-row justify-between">
        <div className="flex flex-row">
          <img src={Logo} alt="Logo" className="w-[35px] h-[35px] m-5" />
          <div className="w-[2px] h-[50px] bg-gray-200 mx-2 my-4"></div>
          <div className="my-7 text-gray-600 font-bold">
            Trial Lesson [Grade 1 - 3]
          </div>
        </div>

        <div className="flex flex-row space-x-5">
          <Timer />
          <button className="bg-[#f35742] my-3 px-5 rounded-md text-white font-bold mr-5">
            End class
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
