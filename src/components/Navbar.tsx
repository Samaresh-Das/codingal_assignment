import { useState } from "react";
import Logo from "../assets/logo.png";
import Timer from "./Timer";
import Modal from "./Modal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);
  const [classRunning, setClassRunning] = useState(true);

  const handleEndClass = () => {
    setIsModalOpen(true);
  };

  const endClass = () => {
    setIsModalOpen(false);
    setTimerRunning(false);
    setResetTimer((prev) => !prev);
    setClassRunning(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const startClass = () => {
    setTimerRunning(true);
    setClassRunning(true);
  };

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
          <Timer isRunning={timerRunning} reset={resetTimer} />
          {classRunning ? (
            <button
              className="bg-[#f35742] hover:bg-[#c93824] my-3 px-5 rounded-md text-white font-bold mr-5 cursor-pointer"
              onClick={handleEndClass}
            >
              End Class
            </button>
          ) : (
            <button
              className="bg-[#f35742] hover:bg-[#c93824] my-3 px-5 rounded-md text-white font-bold mr-5 cursor-pointer"
              onClick={startClass}
            >
              Start Class
            </button>
          )}
        </div>
      </div>
      {isModalOpen && <Modal onConfirm={endClass} onCancel={handleCancel} />}
    </nav>
  );
};

export default Navbar;
