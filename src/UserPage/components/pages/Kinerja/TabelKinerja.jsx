import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function TabelKinerja() {
  const [kinerja, setKinerja] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const id_pegawai = localStorage.getItem('id_pegawai');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://be-simatren.riset-d3rpla.com/api/data_role/hasil-kinerja/${id_pegawai}`);
        setKinerja(response.data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchData();
  }, [id_pegawai]);

  const filteredKinerja = kinerja.filter(item => {
    if (!selectedMonth) return true;
    return moment(item.tanggal).format('MM') === selectedMonth;
  });

  return (
    <div>
      <div className="px-4 rounded-sm border-[1.5px] border-gray-200 items-center shadow-md shadow-gray-400">
        <strong className="text-gray-700 font-medium mt-4 block">Aktivitas Harian</strong>
        {/* Dropdown filter bulan berada di atas tabel */}
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

        {/* Tabel Kinerja */}
        <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto text-sm">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Pertanyaan</td>
                <td className='font-bold py-4'>Jumlah Terlaksana</td>
              </tr>
            </thead>
            <tbody>
              {filteredKinerja.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    Tidak ada data untuk ditampilkan
                  </td>
                </tr>
              )}
              {filteredKinerja.map((item, index) => (
                <tr key={index} className="border-b-[1.5px]">
                  <td className='py-4'>{index + 1}</td>
                  <td className='py-4'>{item.pertanyaan_role}</td>
                  <td className='py-4'>{item.jumlah_terlaksana || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TabelKinerja;
