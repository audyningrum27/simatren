import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import DashboardStatsGrid from "./DashboardStatsGrid";
import KategoriPegawaiChart from "./KategoriPegawaiChart";
import GrafikPresensi from "./GrafikPresensi";
import GrafikKinerja from "./GrafikKinerja";
import GrafikPelatihan from "./GrafikPelatihan";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <p className="text-xl font-bold mb-4 px-5">Dashboard</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="w-40 px-3 py-2">
          <div className="text-sm rounded-sm border border-gray-400 flex justify-between items-center px-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd MMM yyyy"
              customInput={<CustomInput />}
            />
          </div>
        </div>

        {/* Baris Pertama */}
        <div className="md:col-span-2">
          <DashboardStatsGrid selectedDate={selectedDate} />
        </div>

        <div className="grid md:grid-cols-2 gap-x-[470px] gap-y-10 p-3">
          {/* Baris Kedua */}
          <div>
            <KategoriPegawaiChart selectedDate={selectedDate} />
          </div>
          <div>
            <GrafikPresensi selectedDate={selectedDate} />
          </div>

          {/* Baris Ketiga */}
          <div>
            <GrafikKinerja selectedDate={selectedDate} />
          </div>
          <div>
            <GrafikPelatihan selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="text-sm flex-grow flex items-center justify-between px-2 py-1"
    onClick={onClick}
    ref={ref}
  >
    <span>{value || "Select Date"}</span>
    <MdOutlineCalendarMonth className="ml-2" />
  </button>
));

export default Dashboard;