import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Kinerja_Presensi from "./Kinerja_Presensi";
import Kinerja_Pelatihan from "./Kinerja_Pelatihan";
import Kinerja_gform from "./Kinerja_gform";

const GrafikManajemenKinerja = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { nama, nip } = location.state || {};

  return (
    <div>
      <p className="text-xl font-bold mb-4 px-5">Laporan Kinerja</p>
      <div className="px-5">
        <table className="min-w-[50%]">
          <tbody>
            <tr>
              <td className="py-2 font-semibold">Nama</td>
              <td className="py-2">:</td>
              <td className="py-2">{nama}</td>
            </tr>
            <tr>
              <td className="font-semibold">NIP</td>
              <td>:</td>
              <td>{nip}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 flex-1">
        <div className="grid gap-x-[470px] gap-y-10 p-3">
        <div>
            <Kinerja_gform isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div>
            <Kinerja_Presensi isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div>
            <Kinerja_Pelatihan isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrafikManajemenKinerja;