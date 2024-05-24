import DashboardStatsGrid from "./DashboardStatsGrid";
import KategoriPegawaiChart from "./KategoriPegawaiChart";
import GrafikPresensi from "./GrafikPresensi";
import GrafikKinerja from "./GrafikKinerja";
import GrafikPelatihan from "./GrafikPelatihan";
import { useState } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p className="text-xl font-bold mb-4 px-5">Dashboard</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Baris Pertama */}
        <div className="md:col-span-2">
          <DashboardStatsGrid />
        </div>

        <div className="grid md:grid-cols-2 gap-x-[470px] gap-y-10 p-3">
            {/* Baris Kedua */}
          <div>
            <KategoriPegawaiChart isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div>
            <GrafikPresensi isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Baris Ketiga */}
          <div>
            <GrafikKinerja isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div>
            <GrafikPelatihan isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
