import { useState } from "react";
import Kinerja_Presensi from "./Kinerja_Presensi";
import Kinerja_Pelatihan from "./Kinerja_Pelatihan";
import Kinerja_gform from "./Kinerja_gform";

const GrafikManajemenKinerja = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p className="text-xl font-bold mb-4 px-5">Grafik Kinerja</p>
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