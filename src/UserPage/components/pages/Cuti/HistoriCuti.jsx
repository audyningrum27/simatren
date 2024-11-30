import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import { getStatus } from '../../utils/status';

function HistoriCuti() {
  const [dataCuti, setDataCuti] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDataCuti();
  }, []);

  const isPastDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date < today;
  };

  const fetchDataCuti = async () => {
    try {
      const token = localStorage.getItem('token');
      const id_pegawai = localStorage.getItem('id_pegawai');
      if (!id_pegawai) {
        console.error('id_pegawai is undefined');
        return;
      }
      const response = await axios.get(`https://backend.simatren.space/api/data_cuti/cuti/${id_pegawai}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const filteredData = response.data
        .filter(item => !(item.status_cuti.toLowerCase() === 'proses' && isPastDate(item.tanggal_selesai)))
        .map(item => ({
          ...item,
          tanggalMulai: formatDate(item.tanggal_mulai),
          tanggalSelesai: formatDate(item.tanggal_selesai)
        }));

      setDataCuti(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCuti = dataCuti.filter((data) =>
    data.status_cuti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCuti.length / itemsPerPage);
  const currentPageData = filteredCuti.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const viewBuktiFormIzin = (id_cuti) => {
    const url = `https://backend.simatren.space/api/data_cuti/cuti/view-bukti/${id_cuti}`;
    window.open(url, '_blank');
  };

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
                <td className='font-bold py-4'>Status Cuti</td>
                <td className='font-bold py-4'>Bukti Form Izin</td>
              </tr>
            </thead>

            <tbody>
              {currentPageData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Tidak ada data cuti untuk ditampilkan.
                  </td>
                </tr>
              )}
              {currentPageData.map((data, index) => (
                <tr key={index}>
                  <td className="p-1 pt-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{data.tanggalMulai}</td>
                  <td>{data.tanggalSelesai}</td>
                  <td>{getStatus(data.status_cuti)}</td>
                  <td className='font-semibold'>
                    <button
                      className='flex justify-start items-center'
                      onClick={() => data.bukti_form_izin && viewBuktiFormIzin(data.id_cuti)}
                      disabled={!data.bukti_form_izin}
                    >
                      {data.bukti_form_izin ? (
                        <>
                          Lihat
                          <HiChevronRight fontSize={18} className='ml-1' />
                        </>
                      ) : (
                        '-'
                      )}
                    </button>
                  </td>
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
            <button
              key={index}
              className={`rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold ${currentPage === index + 1 ? 'bg-green-900 text-white' : 'hover:bg-green-900'
                }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}><HiChevronRight fontSize={18} className='ml-2' /></button>
      </div>
    </div>
  )
}

export default HistoriCuti;
