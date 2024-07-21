import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { getPegawaiStatus } from "../../utils/status";

function JadwalPelatihan() {
  const [dataPelatihan, setDataPelatihan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah item per halaman
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataPelatihan();
  }, []);

  const fetchDataPelatihan = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data_pelatihan/pelatihan');
      const data = await response.json();
      // Filter data dengan status "Belum Dimulai" dan "Proses"
      const filteredData = data.filter(item => item.status === 'Belum Dimulai' || item.status === 'Proses');
      setDataPelatihan(filteredData);
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
    data.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Membagi data ke halaman-halaman
  const totalPages = Math.ceil(filteredPelatihan.length / itemsPerPage);
  const currentPageData = filteredPelatihan.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Fungsi untuk navigasi halaman
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const BoxWrapper = ({ children, isActive, onClick }) => (
    <button
      className={`rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold ${isActive ? 'bg-green-900 text-white' : 'hover:bg-green-900'
        }`}
      onClick={onClick}
    >
      {children}
    </button>
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
          <button onClick={() => navigate('/AdminPage/atur_jadwal_pelatihan')} className="text-xs text-white font-semibold bg-green-900 rounded-sm h-10 px-10 w-fit">
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
                <td className='font-bold py-4'>NIP</td>
                <td className='font-bold py-4'>Nama Pegawai</td>
                <td className='font-bold py-4'>Penyelenggara</td>
                <td className='font-bold py-4'>Nama Kegiatan</td>
                <td className='font-bold py-4'>Status</td>
                <td className='font-bold py-4'>Action</td>
              </tr>
            </thead>

            <tbody>
              {currentPageData.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    Tidak ada jadwal pelatihan untuk ditampilkan.
                  </td>
                </tr>
              )}
              {currentPageData.map((data, index) => (
                <tr key={index}>
                  <td className="p-1 pt-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{data.nip}</td>
                  <td>{data.nama_pegawai}</td>
                  <td>{data.nama_penyelenggara}</td>
                  <td>{data.nama_kegiatan}</td>
                  <td>{getPegawaiStatus(data.status)}</td>
                  <td className='font-semibold'>
                    <button onClick={() => navigate(`/AdminPage/detail_jadwal_pelatihan/${data.id_pelatihan}`)} className='flex justify-start items-center'>
                      Detail
                      <HiChevronRight fontSize={18} className='ml-1' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigasi Halaman */}
      <div className='py-2 justify-end flex flex-row items-center'>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}><HiChevronLeft fontSize={18} className='mr-2' /></button>
        <div className='flex gap-4'>
          {Array.from({ length: totalPages }, (_, index) => (
            <BoxWrapper
              key={index}
              isActive={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </BoxWrapper>
          ))}
        </div>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}><HiChevronRight fontSize={18} className='ml-2' /></button>
      </div>
    </div>
  );
}

export default JadwalPelatihan;