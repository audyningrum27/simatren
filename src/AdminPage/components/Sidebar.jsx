/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { VscTools } from "react-icons/vsc";
import { RiHistoryFill, RiCalendarScheduleLine } from "react-icons/ri";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_KINERJA, DASHBOARD_SIDEBAR_LINKS } from "./content/Navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "../../AuthContext";

const linkClasses = "flex items-center gap-3 font-semibold px-4 py-3 hover:scale-95 hover:bg-[#AADC93] hover:text-green-900 hover:no-underline active:bg-[#AADC93] rounded-md text-sm";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ isOpen }) {
  const { userType } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`transition-width duration-300 ease-in-out sticky top-0 h-screen w-64 bg-green-900 flex flex-col text-white ${isOpen ? "block" : "hidden"} md:block`}>
      <div className="flex items-center py-3 px-5">
        <span className="text-2xl font-bold tracking-tight md:tracking-super-wide">S!MATREN</span>
      </div>

      <div className="flex flex-row py-3 px-5 pt-2 border-t border-white">
        <div className="py-1">
          <FaUserCircle className="w-7 h-7" />
        </div>
        <div className="px-5">
          <p className="text-sm font-bold">{userType?.nama_pegawai || 'S!MATREN'}</p>
          <p className="text-[10px] font-thin">Admin</p>
        </div>
      </div>

      <hr className="pt-2 border-t border-white" />

      <div>
        <h1 className="flex py-2 px-6 text-xs font-thin">MENU</h1>
      </div>

      <div className="flex-initial w-64 px-2">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div>
          <div id="dropdownButton" onClick={toggleDropdown} className={classNames(linkClasses)}>
            <span className="text-xl">
              <VscTools />
            </span>
            Manajemen Pelatihan
            <span className="text-xl">
              {isDropdownOpen ? <HiChevronDown /> : <HiChevronRight />}
            </span>
          </div>
          {isDropdownOpen && (
            <div className="pl-7">
              <DropdownLink to="/AdminPage/histori_pelatihan" label="Histori Pelatihan" icon={<RiHistoryFill />} />
              <DropdownLink to="/AdminPage/jadwal_pelatihan" label="Jadwal Pelatihan" icon={<RiCalendarScheduleLine />} />
            </div>
          )}
        </div>
        {DASHBOARD_SIDEBAR_KINERJA.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>

      <hr className="p-1 border-t border-green-700 mx-5" />

      <div className="flex-initial w-64 px-2">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link to={item.path} className={classNames(
      pathname === item.path ? "bg-[#AADC93] text-green-900" : "bg-green-900 text-white",
      linkClasses)}>
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

function DropdownLink({ to, label, icon }) {
  const { pathname } = useLocation();
  return (
    <Link to={to} className={classNames(
      pathname === to ? "bg-[#AADC93] text-green-900" : "bg-green-900 text-white",
      linkClasses)}>
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
}
