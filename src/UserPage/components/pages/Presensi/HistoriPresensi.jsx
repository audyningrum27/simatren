import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { formatDate } from '../../utils/formatDate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HistoriPresensi = () => {
  const [dataPresensi, setDataPresensi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataPresensi();
  }, []);

  const fetchDataPresensi = async () => {
    try {
      const token = localStorage.getItem('token');
      const id_pegawai = localStorage.getItem('id_pegawai');
      if (!id_pegawai) {
        console.error('id_pegawai is undefined');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/data_presensi/presensi/${id_pegawai}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data.map(item => ({
        ...item,
        tanggalPresensi: formatDate(item.tanggal_presensi)
      }));
      setDataPresensi(data);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); 
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredPresensi = dataPresensi.filter((data) =>
    data.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPresensi.length / itemsPerPage);
  const currentPageData = filteredPresensi.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p className="text-xl font-bold px-5">Data Presensi</p>
      <div>
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
                  <td className='font-bold py-4'>Tanggal</td>
                  <td className='font-bold py-4'>Jam Masuk</td>
                  <td className='font-bold py-4'>Jam Keluar</td>
                  <td className='font-bold py-4'>Total Jam Kerja</td>
                  <td className='font-bold py-4'>Laporan Kinerja</td>
                </tr>
              </thead>

              <tbody>
  {currentPageData.length === 0 && (
    <tr>
      <td colSpan="6" className="text-center py-4">
        Tidak ada data presensi untuk ditampilkan.
      </td>
    </tr>
  )}
  {currentPageData.map((data, index) => {
    const today = formatDate(new Date()); // Get today's date in the correct format

    return (
      <tr key={index}>
        <td className="p-1 pt-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{data.tanggalPresensi}</td>
        <td>{data.jam_masuk}</td>
        <td className={data.jam_keluar ? '' : 'text-red-700'}>
          {data.jam_keluar ? data.jam_keluar : '(Belum Scan)'}
        </td>
        <td>{data.total_jam_kerja !== null ? `${data.total_jam_kerja}` : '-'}</td>
        <td className='font-semibold'>
          {data.hafalan ? (
            <span className='text-green-700'>Sudah Lengkap</span>
          ) : (
            data.jam_masuk && data.tanggalPresensi === today ? (
              <button
                onClick={() => navigate(`/UserPage/lengkapi_presensi/${data.id_presensi}`)}
                className='flex justify-start items-center'>
                Lengkapi Presensi
                <HiChevronRight fontSize={18} className='ml-1' />
              </button>
            ) : (
              <span>-</span>
            )
          )}
        </td>
      </tr>
    );
  })}
</tbody>

            </table>
          </div>
        </div>

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
    </div>
  );
};

export default HistoriPresensi;