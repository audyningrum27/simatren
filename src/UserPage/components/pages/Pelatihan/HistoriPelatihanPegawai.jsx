import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronRight } from 'react-icons/hi';
import { getStatus } from "../../utils/status";
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

function HistoriPelatihanPegawai() {
  const [historiPelatihanPegawai, setHistoriPelatihan] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistoriPelatihan();
  }, []);

  const fetchHistoriPelatihan = async () => {
    try {
      const token = localStorage.getItem('token');
      const id_pegawai = localStorage.getItem('id_pegawai');
      if (!id_pegawai) {
        console.error('id_pegawai is undefined');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/data_pelatihan/jadwalpelatihan/${id_pegawai}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data
        .filter(item => item.status === 'Selesai' || item.status === 'Proses')
        .map(item => ({
          ...item,
          tanggalMulai: formatDate(item.tanggal_mulai),
          tanggalSelesai: formatDate(item.tanggal_selesai)
        }));
      setHistoriPelatihan(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPelatihan = historiPelatihanPegawai.filter((data) =>
    data.nama_kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.nama_penyelenggara.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <p className="text-xl font-bold px-5">Histori Pelatihan</p>

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

      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
        <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Penyelenggara</td>
                <td className='font-bold py-4'>Nama Kegiatan</td>
                <td className='font-bold py-4'>Tanggal Mulai</td>
                <td className='font-bold py-4'>Tanggal Selesai</td>
                <td className='font-bold py-4'>Status</td>
                <td className='font-bold py-4'>Action</td>
              </tr>
            </thead>

            <tbody>
              {filteredPelatihan.map((pelatihan, index) => (
                <tr key={index}>
                  <td className="p-1 pt-2">{index + 1}</td>
                  <td className="p-1 pt-2">{pelatihan.nama_penyelenggara}</td>
                  <td className="p-1 pt-2">{pelatihan.nama_kegiatan}</td>
                  <td>{pelatihan.tanggalMulai}</td>
                  <td>{pelatihan.tanggalSelesai}</td>
                  <td>{getStatus(pelatihan.status)}</td>
                  <td className='font-semibold'>
                    <button onClick={() => navigate(`/UserPage/detail_pelatihan_pegawai/${pelatihan.id_pelatihan}`)} className='flex justify-start items-center'>
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
  )
}

export default HistoriPelatihanPegawai;
