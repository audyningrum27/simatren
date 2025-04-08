import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMiniPlus } from "react-icons/hi2";

function ManajemenRapat() {
   const navigate = useNavigate();
   // data dummy rapat
   const rapatHariIni = [
      { id: 1, nama: "Rapat Pengelola Masjid", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
      { id: 2, nama: "Rapat Guru MA", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
      { id: 3, nama: "Rapat Guru MTs", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
      { id: 4, nama: "Rapat Guru MTs", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
   ];
   const rapatMendatang = [
      // { id: 1, nama: "Rapat Pengelola Masjid", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
      // { id: 2, nama: "Rapat Guru MA", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
      // { id: 3, nama: "Rapat Guru MTs", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
      // { id: 4, nama: "Rapat Guru MTs", lokasi: "Gedung 1", waktu: "09.00 - Selesai" },
   ];


   return (
      <div>
         {/* Header */}
         <p className="text-xl font-bold px-5">Manajemen Rapat</p>
         <div className="relative py-4 flex flex-row justify-between items-center w-full md:w-full px-4 md:px-0">
            <div className="relative flex-1 mr-2">
               <button onClick={() => navigate('/AdminPage/tambah_rapat')} className="font-semibold text-white bg-green-900 rounded-sm h-10 px-5">
                  <HiMiniPlus fontSize={22} className="inline mr-1" /> Buat Rapat Baru
               </button>
            </div>
            <div className="flex justify-between mx-2 md:mx-10">
               <button onClick={() => navigate('/AdminPage/riwayat_rapat')} className="text-green-900 hover:underline font-semibold">Lihat semua rapat</button>
            </div>
         </div>

         {/* Content */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Rapat Hari Ini */}
            <div className="min-h-[416px] bg-white shadow-md rounded-lg p-4 border-[1.5px] border-gray-200">
               <h2 className="font-semibold text-lg border-b pb-2">Rapat Hari Ini</h2>
               {rapatHariIni.length === 0 ? (
                  <div className="text-gray-400 flex flex-col justify-center items-center h-full">
                     <span className="text-6xl">📄</span>
                     <p className="mt-2">Tidak ada rapat dalam waktu dekat</p>
                  </div>
               ) : (
                  rapatHariIni.map((rapat) => (
                     <div key={rapat.id} className="border-b last:border-none py-3 flex justify-between items-center">
                        <div>
                           <p className="font-medium">{rapat.nama}</p>
                           <p className="text-gray-600 text-sm">📍 {rapat.lokasi}</p>
                           <p className="text-gray-600 text-sm">⏰ {rapat.waktu}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-700">Selengkapnya</button>
                     </div>
                  ))
               )}

            </div>

            {/* Rapat Mendatang */}
            <div className="min-h-[416px] bg-white shadow-md rounded-lg p-4 border-[1.5px] border-gray-200">
               <h2 className="font-semibold text-lg border-b pb-2">Rapat Mendatang</h2>
               {rapatMendatang.length === 0 ? (
                  <div className="text-gray-400 flex flex-col justify-center items-center h-full">
                     <span className="text-6xl">📄</span>
                     <p className="mt-2">Tidak ada rapat dalam waktu dekat</p>
                  </div>
               ) : (
                  rapatMendatang.map((rapat) => (
                     <div key={rapat.id} className="border-b last:border-none py-3 flex justify-between items-center">
                        <div>
                           <p className="font-medium">{rapat.nama}</p>
                           <p className="text-gray-600 text-sm">📍 {rapat.lokasi}</p>
                           <p className="text-gray-600 text-sm">⏰ {rapat.waktu}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-700">Selengkapnya</button>
                     </div>
                  ))
               )}

            </div>
         </div>
      </div>
   );
}

export default ManajemenRapat;
