import React, { useEffect, useState } from 'react';

const DashboardStatsGrid = ({ selectedDate }) => {
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [activePercentage, setActivePercentage] = useState(0);
  const [presensiCount, setPresensiCount] = useState(0);
  const [presensiPercentage, setPresensiPercentage] = useState(0);
  const [cutiCount, setCutiCount] = useState(0);
  const [cutiPercentage, setCutiPercentage] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        
        // Mengambil jumlah pegawai aktif berdasarkan tanggal yang dipilih
        const responseActive = await fetch(`https://be-simatren.riset-d3rpla.com/api/data_pegawai/pegawai/active/count?date=${formattedDate}`);
        const responseTotal = await fetch('https://be-simatren.riset-d3rpla.com/api/data_pegawai/pegawai/total/count');
        const responseCuti = await fetch(`https://be-simatren.riset-d3rpla.com/api/data_pegawai/pegawai/cuti/count?date=${formattedDate}`);
        
        if (!responseActive.ok || !responseTotal.ok || !responseCuti.ok) {
          throw new Error('Failed to fetch employee counts');
        }

        const dataActive = await responseActive.json();
        const dataTotal = await responseTotal.json();
        const dataCuti = await responseCuti.json();

        console.log("Data Active:", dataActive);
        console.log("Data Total:", dataTotal);
        console.log("Data Cuti:", dataCuti);

        setActiveCount(dataActive.active_count);
        setTotalCount(dataTotal.total_count);
        setCutiCount(dataCuti.cuti_count);

        const activePercentage = (dataActive.active_count / dataTotal.total_count) * 100;
        const cutiPercentage = (dataCuti.cuti_count / dataTotal.total_count) * 100;
        
        setActivePercentage(formatPercentage(activePercentage));
        setCutiPercentage(formatPercentage(cutiPercentage));
      } catch (error) {
        console.error('Error fetching employee counts:', error);
      }
    };

    const fetchPresensiData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const responsePresensi = await fetch(`https://be-simatren.riset-d3rpla.com/api/data_presensi/presensi/count?date=${formattedDate}`);
        
        if (!responsePresensi.ok) {
          throw new Error('Failed to fetch presensi data');
        }
        
        const dataPresensi = await responsePresensi.json();
        
        console.log("Data Presensi:", dataPresensi);

        setPresensiCount(dataPresensi.presensi_count);
        setPresensiPercentage(dataPresensi.presensi_percentage);
      } catch (error) {
        console.error('Error fetching presensi data:', error);
      }
    };

    fetchCounts();
    fetchPresensiData();
  }, [selectedDate]);

  function formatPercentage(value) {
    return (value % 1 === 0) ? value.toFixed(0) : value.toFixed(2);
  }

  return (
    <div className="w-fit">
      <div className="flex flex-col md:flex-row gap-5 py-2 px-3">
        <BoxWrapper>
          <div>
            <h3 className="text-sm font-semibold">Pegawai Aktif</h3>
            <h1 className="text-2xl font-bold">{activeCount} <span className="text-sm font-normal">/ {totalCount} Orang</span></h1>
            <div>
              <p className="ml-auto h-5 w-5 text-[10px] font-semibold">{activePercentage}%</p>
              <div className="bg-gray-300 h-2 w-64 rounded">
                <div className="bg-green-900 h-2 rounded" style={{ width: `${activePercentage}%` }}></div>
              </div>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            <h3 className="text-sm font-semibold">Presensi</h3>
            <h1 className="text-2xl font-bold">{presensiCount} <span className="text-sm font-normal">/ {activeCount} Orang</span></h1>
            <div>
              <p className="ml-auto h-5 w-5 text-[10px] font-semibold">{presensiPercentage}%</p>
              <div className="bg-gray-300 h-2 w-64 rounded">
                <div className="bg-green-700 h-2 rounded" style={{ width: `${presensiPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div>
            <h3 className="text-sm font-semibold">Pegawai Cuti</h3>
            <h1 className="text-2xl font-bold">{cutiCount} <span className="text-sm font-normal">/ {totalCount} Orang</span></h1>
            <div>
              <p className="ml-auto h-5 w-5 text-[10px] font-semibold">{cutiPercentage}%</p>
              <div className="flex bg-gray-300 h-2 w-64 rounded">
                <div className="bg-red-500 h-2 rounded" style={{ width: `${cutiPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </BoxWrapper>
      </div>
    </div>
  );
}

export default DashboardStatsGrid;

// eslint-disable-next-line react/prop-types
function BoxWrapper({ children }) {
  return (
    <div className="shadow-md shadow-gray-400 rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
