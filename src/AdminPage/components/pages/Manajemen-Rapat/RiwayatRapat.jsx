import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { getPegawaiStatus } from '../../utils/status';

function RiwayatRapat() {
   const navigate = useNavigate();
   const [riwayatRapat, setRiwayatRapat] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;
   const [searchTerm, setSearchTerm] = useState('');

   // Data Dummy
   const dummyData = [
      { judul: 'Rapat Evaluasi Bulanan', pelaksana: 'Laela Anggraeni', tanggal: '2 Januari 2024', status: 'Selesai' },
      { judul: 'Meeting Proyek A', pelaksana: 'Budi Santoso', tanggal: '3 Januari 2024', status: 'Mendatang' },
      { judul: 'Diskusi Tim IT', pelaksana: 'Rina Wahyuni', tanggal: '4 Januari 2024', status: 'Hari ini' },
      { judul: 'Review Performa Sales', pelaksana: 'Andi Prasetyo', tanggal: '5 Januari 2024', status: 'Selesai' },
      { judul: 'Strategi Marketing 2024', pelaksana: 'Siti Hasanah', tanggal: '6 Januari 2024', status: 'Mendatang' },
      { judul: 'Rapat Tim Keuangan', pelaksana: 'Doni Saputra', tanggal: '7 Januari 2024', status: 'Hari ini' },
      { judul: 'Presentasi Laporan Keuangan', pelaksana: 'Laela Anggraeni', tanggal: '8 Januari 2024', status: 'Selesai' },
      { judul: 'Rapat Koordinasi HRD', pelaksana: 'Budi Santoso', tanggal: '9 Januari 2024', status: 'Selesai' },
      { judul: 'Evaluasi Program CSR', pelaksana: 'Rina Wahyuni', tanggal: '10 Januari 2024', status: 'Selesai' },
      { judul: 'Meeting Tim Legal', pelaksana: 'Andi Prasetyo', tanggal: '11 Januari 2024', status: 'Selesai' },
      { judul: 'Rapat Koordinasi HRD', pelaksana: 'Nurul Qofifah', tanggal: '9 Januari 2024', status: 'Selesai' },
      { judul: 'Evaluasi Program CSR', pelaksana: 'Qofifah', tanggal: '10 Januari 2024', status: 'Selesai' },
      { judul: 'Meeting Tim Legal', pelaksana: 'Audyningrum', tanggal: '11 Januari 2024', status: 'Selesai' }
   ];

   useEffect(() => {
      setRiwayatRapat(dummyData); // Gunakan data dummy sebelum fetch data dari database
      fetchRiwayatRapat();
   }, []);

   const fetchRiwayatRapat = async () => {
      try {
         const response = await fetch('https://be-simatren.riset-d3rpla.com/api/riwayat_rapat');
         const data = await response.json();
         setRiwayatRapat(data);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
   };

   const filteredRapat = riwayatRapat.filter((data) =>
      data.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.pelaksana.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.status.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const totalPages = Math.ceil(filteredRapat.length / itemsPerPage);
   const currentPageData = filteredRapat.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   const goToPreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
   };

   return (
      <div>
         <p className="text-xl font-bold px-5">Riwayat Data Rapat</p>

         {/* Search Bar */}
         <div className="relative py-4 w-full justify-between flex flex-row">
            <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
            <input
               type="text"
               placeholder="Cari judul atau pelaksana..."
               className="text-sm bg-gray-100 border border-gray-300 w-full h-10 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
               value={searchTerm}
               onChange={handleSearchChange}
            />
         </div>

         {/* Table */}
         <div className="min-h-[484px] md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto border rounded-lg shadow-sm">
            <table className="w-full text-sm text-left text-gray-700 min-w-[900px]">
               <thead className="sticky top-0 bg-white uppercase">
                  <tr className='border-b-[1.5px]'>
                     <th className="px-4 py-3">No</th>
                     <th className="px-4 py-3">Judul Rapat</th>
                     <th className="px-4 py-3">Pelaksana</th>
                     <th className="px-4 py-3">Tanggal Rapat</th>
                     <th className="px-4 py-3">Status</th>
                     <th className="px-4 py-3">Aksi</th>
                  </tr>
               </thead>
               <tbody className="bg-white">
                  {currentPageData.length === 0 ? (
                     <tr>
                        <td colSpan="10" className="text-center py-4 text-gray-500">Tidak ada riwayat rapat.</td>
                     </tr>
                  ) : (
                     currentPageData.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                           <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                           <td className="px-4 py-3">{data.judul}</td>
                           <td className="px-4 py-3">{data.pelaksana}</td>
                           <td className="px-4 py-3">{data.tanggal}</td>
                           <td className="px-4 py-3">{getPegawaiStatus(data.status)}</td>
                           <td className="px-4 py-3">
                              <button onClick={() => navigate(``)} className="font-semibold hover:underline flex items-center">
                                 Detail <HiChevronRight fontSize={18} className="ml-1" />
                              </button>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="flex items-center justify-center mt-4 space-x-4">
            <button
               onClick={goToPreviousPage}
               disabled={currentPage === 1}
               className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
               <HiChevronLeft fontSize={18} />
            </button>

            <div className="flex space-x-1">
               {Array.from({ length: totalPages }, (_, index) => (
                  <button
                     key={index}
                     className={`px-4 py-2 rounded-md font-semibold text-sm ${currentPage === index + 1
                           ? 'bg-green-900 text-white'
                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                     onClick={() => setCurrentPage(index + 1)}
                  >
                     {index + 1}
                  </button>
               ))}
            </div>

            <button
               onClick={goToNextPage}
               disabled={currentPage === totalPages}
               className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
               <HiChevronRight fontSize={18} />
            </button>
         </div>
      </div>
   );
}

export default RiwayatRapat;