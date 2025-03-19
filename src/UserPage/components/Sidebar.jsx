/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_TOP_LINKS } from "./content/Navigation";
import { Link, useLocation } from "react-router-dom";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiHistoryFill } from "react-icons/ri";
import { BiQrScan } from "react-icons/bi";
import classNames from "classnames";
import { useAuth } from "../../AuthContext";
import axios from 'axios';


const linkClasses = "flex items-center gap-3 font-semibold px-4 py-3 hover:scale-95 hover:bg-[#98FB98] hover:text-green-900 hover:no-underline active:bg-[#98FB98] rounded-md text-sm";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ isOpen }) {
  const { userType } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profil, setProfil] = useState({
    foto_profil: ''
  });

  const fetchProfil = async () => {
    try {
      const token = localStorage.getItem('token');
      const id_pegawai = localStorage.getItem('id_pegawai');

      const response = await axios.get(`https://be-simatren.riset-d3rpla.com/api/data_pegawai/pegawai/profil/${id_pegawai}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfil(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfil();
    const interval = setInterval(fetchProfil, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`transition-width duration-300 ease-in-out sticky top-0 h-screen w-64 bg-green-900 flex flex-col text-white ${isOpen ? "block" : "hidden"} md:block`}>
      <div className="flex items-center py-3 px-5">
        <span className="text-2xl font-bold tracking-tight md:tracking-super-wide">S!MATREN</span>
      </div>

      <div className="flex flex-row py-3 px-5 pt-2 border-t border-white">
        <div className="flex flex-col justify-center items-center rounded-full mt-1">
          {profil.foto_profil ? (
            <img
              src={`data:image/${profil.foto_profil.type};base64,${profil.foto_profil.data}`}
              alt="Foto Profil"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaUserCircle className="w-8 h-8" />
          )}
        </div>
        <div className="px-5">
          <p className="text-sm font-bold">{profil.nama_pegawai || 'S!MATREN'}</p>
          <p className="text-[10px] font-thin">NIP. {profil.nip || '1737268'}</p>
        </div>
      </div>

      <hr className="pt-2 border-t border-white" />

      <div>
        <h1 className="flex py-2 px-6 text-xs font-thin">MENU</h1>
      </div>

      <div className="flex-initial w-64 px-5">
        {DASHBOARD_SIDEBAR_TOP_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div>
          <div id="dropdownButton" onClick={toggleDropdown} className={classNames(linkClasses)}>
            <span className="text-xl">
              <HiOutlineUserGroup />
            </span>
            Presensi
            <span className="text-xl flex px-16">
              {isDropdownOpen ? <HiChevronDown /> : <HiChevronRight />}
            </span>
          </div>
          {isDropdownOpen && (
            <div className="pl-7">
              <DropdownLink to="/UserPage/historipresensi" label="Histori Presensi" icon={<RiHistoryFill />} />
              <DropdownLink to="/UserPage/scan-qr" label="Scan QR" icon={<BiQrScan />} />
            </div>
          )}
        </div>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>

      <hr className="p-1 border-t border-green-700 mx-5" />

      <div className="flex-initial w-64 px-5">
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
      pathname === item.path ? "bg-[#98FB98] text-green-900" : "bg-green-900 text-white",
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
      pathname === to ? "bg-[#98FB98] text-green-900" : "bg-green-900 text-white",
      linkClasses)}>
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
}