import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineQrcode, HiOutlineUserGroup } from 'react-icons/hi';

const DetailRapat = () => {
   const navigate = useNavigate();

   // Data Dummy
   const dataDetailRapat = {
      judul: 'Rapat Guru MA',
      nomorSurat: '0000111112222227777777',
      pelaksana: 'Unit Guru & Staff MA',
      tanggalRapat: '23 November 2024',
      waktuRapat: '09.00',
      agenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      teksNotulen: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum is simply dummy text of the printing and typesetting industry.',
      linkNotulen: 'https://drive.google.com',
      fileNotulen: 'Dokumen Notulensi Rapat'
   };

   return (
      <div>
         <p className="text-xl font-bold px-5">Detail Rapat</p>

         {/* Tombol Aksi */}
         <div className="flex flex-col md:flex-row gap-2 mb-4 py-4">
            <button
               onClick={() => navigate('/AdminPage/data_presensi_rapat')}
               className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-green-900 hover:text-white font-semibold h-10 px-5 rounded-sm"
            >
               <HiOutlineUserGroup className="text-lg" /> Cek Kehadiran Peserta
            </button>
            <button
               onClick={() => navigate('')}
               className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-green-900 hover:text-white font-semibold h-10 px-5 rounded-sm"
            >
               <HiOutlineQrcode className="text-lg" /> Tampilkan QR Presensi
            </button>
         </div>

         {/* Detail Rapat */}
         <div className="bg-white border rounded-lg shadow-md p-4">
            <dl className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-x-4 gap-y-2">
               <dt className="font-semibold">Judul Rapat</dt>
               <dd>{dataDetailRapat.judul}</dd>

               <dt className="font-semibold">Nomor Surat</dt>
               <dd>{dataDetailRapat.nomorSurat}</dd>

               <dt className="font-semibold">Pelaksana</dt>
               <dd>{dataDetailRapat.pelaksana}</dd>

               <dt className="font-semibold">Tanggal Rapat</dt>
               <dd>{dataDetailRapat.tanggalRapat}</dd>

               <dt className="font-semibold">Waktu Rapat</dt>
               <dd>{dataDetailRapat.waktuRapat}</dd>

               <dt className="font-semibold">Agenda Rapat</dt>
               <dd>{dataDetailRapat.agenda}</dd>

               <dt className="font-semibold">Teks Notulen</dt>
               <dd>{dataDetailRapat.teksNotulen}</dd>

               <dt className="font-semibold">Link Notulen</dt>
               <dd>
                  <a href={dataDetailRapat.linkNotulen} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                     {dataDetailRapat.linkNotulen}
                  </a>
               </dd>

               <dt className="font-semibold">File Notulen</dt>
               <dd className="flex items-center gap-2 flex-wrap">
                  <button className="bg-gray-300 hover:bg-green-900 hover:text-white font-semibold py-1 px-3 rounded-sm">
                     Unduh File
                  </button>
                  {dataDetailRapat.fileNotulen}
               </dd>
            </dl>
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
               OK
            </button>
         </div>
      </div>
   );
};

export default DetailRapat;
