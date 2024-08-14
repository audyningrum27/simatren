import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import { getStatus } from '../../utils/status';

function TabelKinerja() {
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
      const response = await axios.get(`http://localhost:5000/api/data_cuti/cuti/${id_pegawai}`, {
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
    const url = `http://localhost:5000/api/data_cuti/cuti/view-bukti/${id_cuti}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center">
        <div className="h-96 md:w-full w-[34rem] max[500px]:w-[24rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Pertanyaan</td>
                <td className='font-bold py-4'>Jumlah Terlaksana</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TabelKinerja;