import { useState } from "react";
import Logo from "../assets/logo.png";
import Timer from "./Timer";
import Modal from "./Modal";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import Button from "../shared/Button";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);
  const [classRunning, setClassRunning] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          <img
            src={Logo}
            alt="Logo"
            className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] m-3 md:m-5"
          />
          <div className="hidden md:block w-[2px] h-[50px] bg-gray-200 mx-2 my-4"></div>
          <div className="md:hidden my-4 text-gray-600 font-bold">Codingal</div>
          <div className="hidden md:block my-7 text-gray-600 font-bold">
            Trial Lesson [Grade 1 - 3]
          </div>

          <div className="bg-[#f35742] hover:bg-[#c93824] my-3 px-5 rounded-md text-white font-bold mr-5 cursor-pointers py-4 mx-5 hidden md:block">
            <NavLink to="/posts" end>
              Posts
            </NavLink>
          </div>
        </div>

        <div className="md:hidden">
          <RxHamburgerMenu
            className="w-[35px] h-[35px] m-3 text-gray-600 cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          />
        </div>

        <div className="md:flex md:flex-row space-x-5 hidden ">
          <Timer isRunning={timerRunning} reset={resetTimer} />
          {classRunning ? (
            <Button onClick={handleEndClass} text="End Class" />
          ) : (
            <Button onClick={startClass} text="Start Class" />
          )}
        </div>
      </div>
      {/* Backdrop (When Drawer is Open) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-gray-400 bg-opacity-90 transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
      {/* Drawer for mobile view */}
      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-white shadow-lg transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <div className="p-5 flex justify-end">
          <IoClose
            className="w-7 h-7 text-gray-600 cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          />
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col items-center space-y-5">
          <div className=" my-7 text-gray-600 font-bold">
            Trial Lesson [Grade 1 - 3]
          </div>

          <hr className="w-10/12 border-gray-400" />
          <Timer isRunning={timerRunning} reset={resetTimer} />
          {classRunning ? (
            <button
              className="bg-[#f35742] hover:bg-[#c93824] px-5 py-2 rounded-md text-white font-bold cursor-pointer"
              onClick={handleEndClass}
            >
              End Class
            </button>
          ) : (
            <button
              className="bg-[#f35742] hover:bg-[#c93824] px-5 py-2 rounded-md text-white font-bold cursor-pointer"
              onClick={startClass}
            >
              Start Class
            </button>
          )}

          <div className="text-[#f35742] text-xl font-bold mr-5 cursor-pointers py-4 mx-5 md:hidden underline">
            <NavLink to="/posts" end>
              Posts
            </NavLink>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onConfirm={endClass} onCancel={handleCancel} />}
    </nav>
  );
};

export default Navbar;
