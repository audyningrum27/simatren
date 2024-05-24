import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useState } from "react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col ${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300 ease-in-out flex-1">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
