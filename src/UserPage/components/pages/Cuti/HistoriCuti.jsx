import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import { getStatus } from '../../utils/status';

function HistoriCuti() {
  const [dataCuti, setDataCuti] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDataCuti();
  }, []);

  const fetchDataCuti = async () => {
    try {
      const token = localStorage.getItem('token');
      const id_pegawai = localStorage.getItem('id_pegawai');
      if (!id_pegawai) {
        console.error('id_pegawai is undefined');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/data_cuti/cuti/${id_pegawai}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data.map(item => ({
        ...item,
        tanggalMulai: formatDate(item.tanggal_mulai),
        tanggalSelesai: formatDate(item.tanggal_selesai)
      }));
      setDataCuti(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCuti = dataCuti.filter((data) =>
    data.status_cuti.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <p className="text-xl font-bold px-5">Histori Cuti</p>

      <div className="relative py-4 w-full justify-between flex flex-row">
        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 pr-4 rounded-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center">
        <div className="h-96 md:w-full w-[34rem] max[500px]:w-[24rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Tanggal Mulai</td>
                <td className='font-bold py-4'>Tanggal Selesai</td>
                <td className='font-bold py-4'>Alasan Cuti</td>
                <td className='font-bold py-4'>Status Cuti</td>
              </tr>
            </thead>

            <tbody>
              {filteredCuti.map((data, index) => (
                <tr key={index}>
                  <td className="p-1 pt-2">{index + 1}</td>
                  <td>{data.tanggalMulai}</td>
                  <td>{data.tanggalSelesai}</td>
                  <td>{data.alasan_cuti}</td>
                  <td>{getStatus(data.status_cuti)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HistoriCuti;
