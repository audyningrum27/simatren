import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencilAlt, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { getPegawaiStatus } from '../../utils/status';

const DataPresensiRapat = () => {
   const navigate = useNavigate();
   const [dataPresensiRapat, setDataPresensiRapat] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;
   const [editIndex, setEditIndex] = useState(null);
   const [editedKeterangan, setEditedKeterangan] = useState('');

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

   const handleSimpanEdit = (index) => {
      const updated = [...dataPresensiRapat];
      updated[(currentPage - 1) * itemsPerPage + index].keterangan = editedKeterangan;
      setDataPresensiRapat(updated);
      setEditIndex(null);
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
               <table className="w-full text-sm text-left text-gray-700 min-w-[900px] table-fixed">
                  <thead className="sticky top-0 bg-white uppercase">
                     <tr className='border-b-[1.5px]'>
                        <th className="px-4 py-3 w-[50px]">No</th>
                        <th className="px-4 py-3 w-auto">Nama Peserta</th>
                        <th className="px-4 py-3 w-auto">Jabatan</th>
                        <th className="px-4 py-3 w-[150px]">Jam Scan QR</th>
                        <th className="px-4 py-3 w-[150px]">Status</th>
                        <th className="px-4 py-3 w-[250px]">Keterangan</th>
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
                              <td className='px-4 py-3 align-top'>
                                 {editIndex === index ? (
                                    <div className="flex items-center gap-2">
                                       <input
                                          type="text"
                                          className="border rounded-md px-2 py-1 text-sm w-full max-w-[180px]"
                                          value={editedKeterangan}
                                          onChange={(e) => setEditedKeterangan(e.target.value)}
                                       />
                                       <button
                                          onClick={() => handleSimpanEdit(index)}
                                          className="bg-gray-300 text-black px-3 py-1 rounded-md text-sm hover:bg-green-900 hover:text-white"
                                       >
                                          Simpan
                                       </button>
                                    </div>
                                 ) : (
                                    <div className="flex items-start gap-2 max-w-[200px] whitespace-pre-wrap break-all">
                                       <span>{data.keterangan || 'Edit'}</span>
                                       <button
                                          onClick={() => {
                                             setEditIndex(index);
                                             setEditedKeterangan(data.keterangan || '');
                                          }}
                                          className="text-gray-500 hover:text-gray-700"
                                       >
                                          <HiOutlinePencilAlt fontSize={18} />
                                       </button>
                                    </div>
                                 )}
                              </td>

                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Pagination + Buttons in one flex container */}
         <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 px-4 mt-3 py-2">

            {/* Pagination */}
            <div className="flex justify-center flex-wrap gap-2 w-full md:w-auto">
               <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
               >
                  <HiChevronLeft fontSize={18} />
               </button>

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
                                 <button onClick={() => setCurrentPage(1)}
                                    className="px-4 py-2 rounded-md font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300">
                                    1
                                 </button>
                                 <span className="px-2">...</span>
                              </>
                           )}
                           {pageNumbers.map((page) => (
                              <button key={page}
                                 className={`px-4 py-2 rounded-md font-semibold text-sm ${currentPage === page ? 'bg-green-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                 onClick={() => setCurrentPage(page)}
                              >
                                 {page}
                              </button>
                           ))}
                           {endPage < totalPages && (
                              <>
                                 <span className="px-2">...</span>
                                 <button onClick={() => setCurrentPage(totalPages)}
                                    className="px-4 py-2 rounded-md font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300">
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
            <div className="flex justify-center md:justify-end w-full md:w-auto">
               <button
                  type="submit"
                  className="w-full md:w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => navigate('/AdminPage/detail_rapat')}
               >
                  Selesai
               </button>
            </div>
         </div>
      </div>
   );
}

export default DataPresensiRapat;