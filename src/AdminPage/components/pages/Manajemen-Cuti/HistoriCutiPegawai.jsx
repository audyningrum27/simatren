import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { formatDate } from '../../utils/formatDate';
import { getPegawaiStatus } from '../../utils/status';

function HistoriCutiPegawai() {
  const [dataCuti, setDataCuti] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Sesuaikan dengan jumlah item per halaman yang Anda inginkan

  useEffect(() => {
    fetchDataCuti();
  }, []);

  const fetchDataCuti = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data_cuti/cuti/all');
      const result = await response.json();

      if (result && Array.isArray(result)) {
        const data = result.map(item => ({
          ...item,
          tanggalMulai: formatDate(item.tanggal_mulai),
          tanggalSelesai: formatDate(item.tanggal_selesai),
        }));
        setDataCuti(data);
      } else {
        console.error('Unexpected response data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Kembali ke halaman pertama saat melakukan pencarian
  };

  const filteredCuti = dataCuti.filter((data) =>
    data.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hitung total halaman berdasarkan data yang sudah difilter
  const totalPages = Math.ceil(filteredCuti.length / itemsPerPage);

  // Potong data berdasarkan halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCutiData = filteredCuti.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk navigasi halaman
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const BoxWrapper = ({ children, isActive, onClick }) => (
    <button
      className={`rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold ${
        isActive ? 'bg-green-900 text-white' : 'hover:bg-green-900'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div>
      <p className="text-xl font-bold px-5">Histori Data Cuti Pegawai</p>
      <div className="relative py-4 w-full justify-between flex flex-row">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
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
          <table className="text-gray-700 min-w-[900px]">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className="font-bold py-4">No.</td>
                <td className="font-bold py-4">NIP</td>
                <td className="font-bold py-4">Nama</td>
                <td className="font-bold py-4">Tanggal Mulai</td>
                <td className="font-bold py-4">Tanggal Selesai</td>
                <td className="font-bold py-4">Alasan Cuti</td>
                <td className="font-bold py-4">Status</td>
              </tr>
            </thead>

            <tbody>
              {currentCutiData.map((data, index) => (
                <tr key={index}>
                  <td className="p-1 pt-2">{startIndex + index + 1}</td>
                  <td>{data.nip}</td>
                  <td>{data.nama_pegawai}</td>
                  <td>{data.tanggalMulai}</td>
                  <td>{data.tanggalSelesai}</td>
                  <td>{data.alasan_cuti}</td>
                  <td>{getPegawaiStatus(data.status_cuti)}</td>
                </tr>
              ))}
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
  );
}

export default HistoriCutiPegawai;
