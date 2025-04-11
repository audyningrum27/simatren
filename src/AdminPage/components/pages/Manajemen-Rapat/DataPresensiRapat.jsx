import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencilAlt, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { getPegawaiStatus } from '../../utils/status';

const DataPresensiRapat = () => {
   const navigate = useNavigate();
   const [dataPresensiRapat, setDataPresensiRapat] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;

   // Data Dummy
   const dummyData = [
      { nama_peserta: 'Nurul Qofifah', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Hadir' },
      { nama_peserta: 'Audyningrum', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Hadir' },
      { nama_peserta: 'Andi Nur', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Hadir' },
      { nama_peserta: 'Halisha', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Hadir' },
      { nama_peserta: 'Wanda', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Hadir' },
      { nama_peserta: 'Aprianingrum', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Hadir' },
      { nama_peserta: 'Irtiyah Zeynah', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Tidak Hadir' },
      { nama_peserta: 'Rini', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Tidak Hadir' },
      { nama_peserta: 'Tiara', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Tidak Hadir' },
      { nama_peserta: 'Yohana', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Tidak Hadir' },
      { nama_peserta: 'Maulidya', jabatan: 'Guru', jam_scanqr: '09.00', status_presensi: 'Tidak Hadir' }
   ];

   useEffect(() => {
      setDataPresensiRapat(dummyData); // Gunakan data dummy sebelum fetch data dari database
      fetchDataPresensiRapat();
   }, []);

   const fetchDataPresensiRapat = async () => {
      try {
         const response = await fetch('https://be-simatren.riset-d3rpla.com/api/data_role');
         const data = await response.json();
         setDataPresensiRapat(data);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   const totalPages = Math.ceil(dataPresensiRapat.length / itemsPerPage);
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentPageData = dataPresensiRapat.slice(indexOfFirstItem, indexOfLastItem);

   const goToPreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
   };

   return (
      <div>
         <span className="text-2xl text-gray-950 font-semibold flex justify-center">Presensi Rapat</span>

         {/* Table */}
         <div className="py-4">
            <div className="min-h-[484px] md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto border rounded-lg shadow-sm">
               <table className="w-full text-sm text-left text-gray-700 min-w-[900px]">
                  <thead className="sticky top-0 bg-white uppercase">
                     <tr className='border-b-[1.5px]'>
                        <th className="px-4 py-3">No</th>
                        <th className="px-4 py-3">Nama Peserta</th>
                        <th className="px-4 py-3">Jabatan</th>
                        <th className="px-4 py-3">Jam Scan QR</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Keterangan</th>
                     </tr>
                  </thead>
                  <tbody>
                     {currentPageData.length === 0 ? (
                        <tr>
                           <td colSpan="10" className="text-center py-4 text-gray-500">Tidak ada riwayat rapat.</td>
                        </tr>
                     ) : (
                        currentPageData.map((data, index) => (
                           <tr key={index} className='hover:bg-gray-50'>
                              <td className='px-4 py-3'>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td className='px-4 py-3'>{data.nama_peserta}</td>
                              <td className='px-4 py-3'>{data.jabatan}</td>
                              <td className='px-4 py-3'>{data.jam_scanqr}</td>
                              <td className='px-4 py-3'>{getPegawaiStatus(data.status_presensi)}</td>
                              <td className='px-4 py-3'>
                                 <button onClick={() => navigate(``)} className="font-semibold hover:underline flex items-center">
                                    Edit <HiOutlinePencilAlt fontSize={18} className="inline ml-1" />
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
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
            
            {/* sliding window pagination */}
            <div className="flex space-x-1">
               {(() => {
                  const visiblePages = 5;
                  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
                  let endPage = startPage + visiblePages - 1;

                  if (endPage > totalPages) {
                     endPage = totalPages;
                     startPage = Math.max(1, endPage - visiblePages + 1);
                  }

                  const pageNumbers = [];
                  for (let i = startPage; i <= endPage; i++) {
                     pageNumbers.push(i);
                  }

                  return (
                     <>
                        {startPage > 1 && (
                           <>
                              <button
                                 onClick={() => setCurrentPage(1)}
                                 className="px-4 py-2 rounded-md font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
                              >
                                 1
                              </button>
                              <span className="px-2">...</span>
                           </>
                        )}
                        {pageNumbers.map((page) => (
                           <button
                              key={page}
                              className={`px-4 py-2 rounded-md font-semibold text-sm ${currentPage === page
                                 ? 'bg-green-900 text-white'
                                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                 }`}
                              onClick={() => setCurrentPage(page)}
                           >
                              {page}
                           </button>
                        ))}
                        {endPage < totalPages && (
                           <>
                              <span className="px-2">...</span>
                              <button
                                 onClick={() => setCurrentPage(totalPages)}
                                 className="px-4 py-2 rounded-md font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
                              >
                                 {totalPages}
                              </button>
                           </>
                        )}
                     </>
                  );
               })()}
            </div>

            <button
               onClick={goToNextPage}
               disabled={currentPage === totalPages}
               className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
               <HiChevronRight fontSize={18} />
            </button>
         </div>

         {/* Buttons */}
         <div className="px-5 p-5 flex flex-row gap-6 justify-end md:w-[100%] w-[90%] mx-auto mt-3">
            <button
               type="button"
               className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
               Edit
            </button>
            <button
               type="submit"
               className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
               onClick={() => navigate('/AdminPage/riwayat_rapat')}
            >
               Simpan
            </button>
         </div>
      </div>
   );
}

export default DataPresensiRapat;