import { MdNotifications } from "react-icons/md";
import { FaBars } from "react-icons/fa";

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <div className="w-full">
      <div className="text-gray-400 bg-white shadow-md h-14 px-4 flex items-center w-full">
        <button onClick={() => setIsOpen(prev => !prev)} className="text-gray-400 md:hidden">
          <FaBars className="w-6 h-6" />
        </button>
        <div className="ml-auto flex items-center justify-center box-border h-6 w-8 border-2 border-green-900 rounded-md shadow-md shadow-gray-400 cursor-pointer">
          <MdNotifications className="icon-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Header;
