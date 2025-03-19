import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TabelPelatihan() {
  const [allPelatihanData, setAllPelatihanData] = useState([]);
  const [filteredPelatihanCounts, setFilteredPelatihanCounts] = useState({
    'Belum Dimulai': 0,
    'Proses': 0,
    'Selesai': 0
  });
  const [selectedMonth, setSelectedMonth] = useState('');
  const id_pegawai = localStorage.getItem('id_pegawai');

  useEffect(() => {
    const fetchPelatihanData = async () => {
      try {
        const response = await axios.get(`https://be-simatren.riset-d3rpla.com/api/data_pelatihan/pelatihan-per-bulan/${id_pegawai}`);
        setAllPelatihanData(response.data);
        // Filter data setelah data diambil
        filterPelatihanCounts(selectedMonth, response.data);
      } catch (error) {
        console.error('Error fetching pelatihan data:', error);
      }
    };

    fetchPelatihanData();
  }, [id_pegawai]);

  useEffect(() => {
    // Filter data setiap kali bulan yang dipilih berubah
    filterPelatihanCounts(selectedMonth, allPelatihanData);
  }, [selectedMonth, allPelatihanData]);

  const filterPelatihanCounts = (month, data) => {
    const counts = {
      'Belum Dimulai': 0,
      'Proses': 0,
      'Selesai': 0
    };

    data.forEach(item => {
      const itemMonth = parseInt(item.bulan, 10);
      const selectedMonthInt = parseInt(month, 10);

      if (!month || itemMonth === selectedMonthInt) {
        if (item.status in counts) {
          counts[item.status] += item.jumlah_pelatihan;
        }
      }
    });

    setFilteredPelatihanCounts(counts);
  };

  const hasData = Object.values(filteredPelatihanCounts).some(count => count > 0);

  return (
    <div>
      <div className="px-4 rounded-sm border-[1.5px] border-gray-200 items-center shadow-md shadow-gray-400">
        <strong className="text-gray-700 font-medium mt-4 block">Pelatihan</strong>
        {/* Dropdown filter bulan */}
        <div className="flex justify-start mt-4 text-sm">
          <select
            className="border rounded px-2 py-1"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All</option>
            <option value="01">Januari</option>
            <option value="02">Februari</option>
            <option value="03">Maret</option>
            <option value="04">April</option>
            <option value="05">Mei</option>
            <option value="06">Juni</option>
            <option value="07">Juli</option>
            <option value="08">Agustus</option>
            <option value="09">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
        </div>

        {/* Tabel Pelatihan */}
        <div className="h-72 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto text-sm">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Status Pelatihan</td>
                <td className='font-bold py-4'>Jumlah</td>
              </tr>
            </thead>
            <tbody>
              {!hasData ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">Tidak ada data untuk ditampilkan</td>
                </tr>
              ) : (
                <>
                  <tr className="border-b-[1.5px]">
                    <td className='py-4'>1</td>
                    <td className='py-4'>Belum Dimulai</td>
                    <td className='py-4'>{filteredPelatihanCounts['Belum Dimulai']}</td>
                  </tr>
                  <tr className="border-b-[1.5px]">
                    <td className='py-4'>2</td>
                    <td className='py-4'>Proses</td>
                    <td className='py-4'>{filteredPelatihanCounts['Proses']}</td>
                  </tr>
                  <tr className="border-b-[1.5px]">
                    <td className='py-4'>3</td>
                    <td className='py-4'>Selesai</td>
                    <td className='py-4'>{filteredPelatihanCounts['Selesai']}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TabelPelatihan;
