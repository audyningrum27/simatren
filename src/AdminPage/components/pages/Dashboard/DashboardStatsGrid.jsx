import { MdOutlineCalendarMonth } from "react-icons/md";

const DashboardStatsGrid = () => {
  return (
    <div className="w-fit">
      {/* Tambahkan Backend supaya dapat memilih tanggal */}
      <div className="w-64 px-3 py-2">
        <div className="text-sm rounded-sm border border-gray-400 flex justify-center items-center ">20 Feb 2024 - 26 Feb 2024 <MdOutlineCalendarMonth /> </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 py-2 px-3">
        <BoxWrapper>
          <div>
            <h3 className="text-sm font-semibold">Pegawai Aktif</h3>
            <h1 className="text-2xl font-bold">120 <span className="text-sm font-normal">/127 Orang</span></h1>
            <div>
              <p className="ml-auto h-5 w-5 text-[10px] font-semibold">80%</p>
              <div className="bg-gray-300 h-2 w-64 rounded">
                <div className="bg-green-900 w-[80%] h-2 rounded"></div>
              </div>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            <h3 className="text-sm font-semibold">Presensi</h3>
            <h1 className="text-2xl font-bold">120 <span className="text-sm font-normal">/127 Orang</span></h1>
            <div>
              <p className="ml-auto h-5 w-5 text-[10px] font-semibold">80%</p>
              <div className="bg-gray-300 h-2 w-64 rounded">
                <div className="bg-green-700 w-[80%] h-2 rounded"></div>
              </div>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            <h3 className="text-sm font-semibold">Pegawai Cuti</h3>
            <h1 className="text-2xl font-bold">120 <span className="text-sm font-normal">/127 Orang</span></h1>
            <div>
              <p className="ml-auto h-5 w-5 text-[10px] font-semibold">80%</p>
              <div className="flex bg-gray-300 h-2 w-64 rounded">
                <div className="bg-green-500 w-[80%] h-2 rounded"></div>
              </div>
            </div>
          </div>
        </BoxWrapper>
      </div>
    </div>
  )
}

export default DashboardStatsGrid;

function BoxWrapper({ children }) {
  return (
    <div className="shadow-md shadow-gray-400 rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
  )
}
