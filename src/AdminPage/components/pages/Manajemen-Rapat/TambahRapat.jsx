import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const TambahRapat = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      judulRapat: "",
      nomorSurat: "",
      pelaksana: "",
      ruangRapat: "",
      tanggalRapat: "",
      waktuRapat: "",
      pesertaRapat: "",
      agendaRapat: "",
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   return (
      <div className="px-5">
         <span className="text-2xl text-gray-950 font-semibold flex justify-center">Tambah Rapat</span>
         <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between'>
            <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">
               <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {/* Judul Rapat */}
                     <InputField
                        label="Judul Rapat"
                        name="judulRapat"
                        value={formData.judulRapat}
                        onChange={handleChange}
                        placeholder="Masukkan judul rapat"
                        required
                     />

                     {/* Nomor Rapat */}
                     <InputField
                        label="Nomor Surat"
                        name="nomorSurat"
                        value={formData.nomorSurat}
                        onChange={handleChange}
                        placeholder="Masukkan nomor surat"
                        required
                     />

                     {/* Pelaksana */}
                     <InputField
                        label="Pelaksana"
                        name="pelaksana"
                        value={formData.pelaksana}
                        onChange={handleChange}
                        placeholder="Nama atau unit pelaksana rapat"
                        required
                     />

                     {/* Ruang Rapat */}
                     <InputField
                        label="Ruang / Gedung Rapat"
                        name="ruangRapat"
                        value={formData.ruangRapat}
                        onChange={handleChange}
                        placeholder="Masukkan ruang rapat"
                        required
                     />

                     {/* Tanggal Rapat */}
                     <InputField
                        label="Tanggal Rapat"
                        name="tanggalRapat"
                        type="date"
                        value={formData.tanggalRapat}
                        onChange={handleChange}
                        required
                     />

                     {/* Waktu Rapat */}
                     <InputField
                        label="Waktu Rapat"
                        name="waktuRapat"
                        type="time"
                        value={formData.waktuRapat}
                        onChange={handleChange}
                        required
                     />

                     {/* Peserta Rapat */}
                     <TextAreaField
                        label="Peserta Rapat"
                        name="pesertaRapat"
                        value={formData.pesertaRapat}
                        onChange={handleChange}
                        placeholder="Masukkan unit role atau nama pegawai"
                        required
                     />

                     {/* Agenda Rapat */}
                     <TextAreaField
                        label="Agenda Rapat"
                        name="agendaRapat"
                        value={formData.agendaRapat}
                        onChange={handleChange}
                        placeholder="Masukkan Agenda Rapat"
                        required
                     />
                  </div>
               </form>

            </div>
         </div>
         {/* Buttons */}
         <div className="flex flex-row gap-6 justify-end md:w-[100%] w-[90%] mx-auto mt-3">
            <button
               type="button"
               className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
               onClick={() => navigate('/AdminPage/manajemen_rapat')}
            >
               Batal
            </button>
            <button
               type="submit"
               className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
               //onClick={handleSubmit}
            >
               Simpan
            </button>
         </div>
      </div>
   );
};

// Reusable Input Component
const InputField = ({ label, name, type = "text", icon, value, onChange, placeholder, required }) => (
   <div>
      <label className="text-gray-900 text-sm font-medium">
         {label} {required && <span className="text-red-700">*</span>}
      </label>
      <div className="relative">
         <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 pr-2 rounded-md"
            required={required}
         />
         {icon && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
               {icon}
            </span>
         )}
      </div>
   </div>
);

// Reusable TextArea Component
const TextAreaField = ({ label, name, value, onChange, placeholder, required }) => (
   <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <label className="text-gray-900 text-sm font-medium">
         {label} {required && <span className="text-red-700">*</span>}
      </label>
      <textarea
         name={name}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         rows="3"
         className="w-full px-3 py-2 border rounded-md focus:outline-gray-400 active:outline-gray-400 border border-gray-300"
         required={required}
      ></textarea>
   </div>
);

export default TambahRapat;