import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TambahDataRole = () => {
   const navigate = useNavigate();
   const [showPopup, setShowPopup] = useState(false);
   const [formData, setFormData] = useState({
      nama_role: "",
      unit_kerja: "",
      fiturManajemen: [],
      status: "None" // default None
   });

   const tanggung_jawabList = [
      "Manajemen Pegawai",
      "Manajemen Gaji",
      "Manajemen Presensi",
      "Manajemen Cuti",
      "Manajemen Rapat",
      "Manajemen Pelatihan",
      "Manajemen Kinerja"
   ];

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      });
   };

   const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;

      setFormData((prevData) => {
         const updatedFiturManajemen = checked
            ? [...prevData.fiturManajemen, value]
            : prevData.fiturManajemen.filter(item => item !== value);

         // Update status otomatis
         const newStatus = updatedFiturManajemen.length > 0 ? "Aktif" : "None";

         return {
            ...prevData,
            fiturManajemen: updatedFiturManajemen,
            status: newStatus
         };
      });
   };

   const handleSave = async () => {
      try {
         console.log("Data yang akan dikirim:", formData);
         // Pastikan endpoint API sudah benar
         const response = await axios.post('https://be-simatren.riset-d3rpla.com/api/data_role/manajemen/pegawai/role/create', {
            namaRole: formData.nama_role,
            unitKerja: formData.unit_kerja,
            status: formData.status,
            tanggungJawab: formData.fiturManajemen
         });

         if (response.status === 200) {
            setShowPopup(true);
         }
      } catch (error) {
         console.error('Error saving data:', error);
      }
   };

   useEffect(() => {
      if (showPopup) {
         const timer = setTimeout(() => {
            setShowPopup(false);
            navigate('/AdminPage/manajemen_role'); // Navigasi ke halaman manajemen role
         }, 2000);

         return () => clearTimeout(timer);
      }
   }, [showPopup, navigate]);

   return (
      <div className="px-5">
         <span className="text-2xl text-gray-950 font-semibold flex justify-center">Tambah Data Role</span>
         <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between'>
            <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">
               <form>
                  <div className="grid md:grid-cols-2 gap-4">
                     {/* Nama Role Posisi */}
                     <InputField
                        label="Nama Role / Posisi"
                        name="nama_role"
                        value={formData.nama_role}
                        onChange={handleChange}
                        placeholder="Masukkan nama posisi"
                        required
                     />

                     {/* Unit Kerja - Dropdown */}
                     <div>
                        <label className="text-gray-900 text-sm font-medium">
                           Unit Kerja <span className="text-red-700">*</span>
                        </label>
                        <select
                           name="unit_kerja"
                           value={formData.unit_kerja}
                           onChange={handleChange}
                           className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-1 rounded-md text-gray-400"
                           required
                        >
                           <option value="" disabled hidden>Pilih TPA / Non TPA</option>
                           <option value="TPA" className="text-black">TPA</option>
                           <option value="Non TPA" className="text-black">Non TPA</option>
                        </select>
                     </div>
                  </div>

                  {/* Checkbox Manajemen */}
                  <div className="mt-5">
                     <p className="text-gray-900 font-medium mb-2">
                        Role ini akan bertanggung jawab mengelola fitur manajemen apa?
                     </p>
                     <p className="text-gray-500 text-sm mb-3">
                        Kosongkan jika role ini tidak mengelola apapun, hanya pengguna biasa.
                     </p>
                     <div className="grid md:grid-cols-2 gap-2">
                        {tanggung_jawabList.map((fitur, index) => {
                           const fiturFormatted = fitur.toLowerCase().replace(/\s+/g, '-'); // lowercase & spasi jadi -
                           return (
                              <label key={index} className="flex items-center space-x-2">
                                 <input
                                    type="checkbox"
                                    value={fiturFormatted}
                                    checked={formData.fiturManajemen.includes(fiturFormatted)}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4"
                                 />
                                 <span className="text-gray-900 text-sm">{fitur}</span>
                              </label>
                           );
                        })}
                     </div>
                  </div>
               </form>
            </div>
         </div>

         {/* Buttons */}
         <div className="flex flex-row gap-6 justify-end md:w-[100%] w-[90%] mx-auto mt-3">
            <button
               type="button"
               className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
               onClick={() => navigate('/AdminPage/manajemen_role')}
            >
               Batal
            </button>
            <button
               type="button"
               className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
               onClick={handleSave}
            >
               Simpan
            </button>
         </div>

         {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
                  <p>Data Role Berhasil Ditambahkan!</p>
               </div>
            </div>
         )}
      </div>
   );
};

// Reusable Input Component
const InputField = ({ label, name, type = "text", value, onChange, placeholder, required }) => (
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
      </div>
   </div>
);

export default TambahDataRole;