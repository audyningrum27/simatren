import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { HiMiniPlus } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";
import { getPegawaiStatus } from '../../utils/status';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

function JadwalPelatihan() {
  const [dataPelatihan, setDataPelatihan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataPelatihan();
  }, []);

  const fetchDataPelatihan = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jadwal_pelatihan/jadwalpelatihan');
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        tanggal_mulai: moment.utc(item.tanggal_mulai).tz('Asia/Jakarta').format('DD/MM/YYYY'),
        tanggal_selesai: moment.utc(item.tanggal_selesai).tz('Asia/Jakarta').format('DD/MM/YYYY'),
      }));
      setDataPelatihan(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPelatihan = dataPelatihan.filter((data) =>
    data.nama_kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <p className="text-xl font-bold px-5">Jadwal Pelatihan</p>

      <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-2/3 h-10 pl-11 rounded-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className='flex justify-between mx-2 md:mx-10'>
          <HiMiniPlus fontSize={22} className="text-neutral-50 absolute top-1/2 -translate-y-1/2 ml-2" />
          <button onClick={() => navigate('/AdminPage/atur_jadwal_pelatihan')} className="text-xs text-white bg-green-900 rounded-sm h-10 px-10 w-fit">
            Atur Jadwal Pelatihan
          </button>
        </div>
      </div>

      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
        <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Nama Penyelenggara</td>
                <td className='font-bold py-4'>Nama Kegiatan</td>
                <td className='font-bold py-4'>Tanggal Mulai</td>
                <td className='font-bold py-4'>Status</td>
                <td className='font-bold py-4'>Action</td>
              </tr>
            </thead>

            <tbody>
              {filteredPelatihan.map((data, index) => (
                <tr key={index}>
                  <td className="p-1 pt-2">{index + 1}</td>
                  <td>{data.nama_penyelenggara}</td>
                  <td>{data.nama_kegiatan}</td>
                  <td>{data.tanggal_mulai}</td>
                  <td>{getPegawaiStatus(data.status)}</td>
                  <td className='font-semibold'>
                    <button onClick={() => navigate(`/AdminPage/detail_jadwal_pelatihan/${data.id_pelatihan}`)} className='flex justify-start items-center'>
                      Detail
                      <HiChevronRight fontSize={18} className='ml-2' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JadwalPelatihan;
