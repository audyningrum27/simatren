import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const TambahDataRole = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      namaPosisi: "",
      unitKerja: "",
      fiturManajemen: [],
   });

   const fiturManajemenList = [
      "Manajemen Pegawai",
      "Manajemen Gaji",
      "Manajemen Presensi",
      "Manajemen Cuti",
      "Manajemen Rapat",
      "Manajemen Pelatihan",
      "Manajemen Kinerja"
   ];

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         fiturManajemen: checked
            ? [...prevData.fiturManajemen, value]
            : prevData.fiturManajemen.filter((item) => item !== value)
      }));
   };

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
                        name="namaPosisi"
                        value={formData.namaPosisi}
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
                           name="unitKerja"
                           value={formData.unitKerja}
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
                        {fiturManajemenList.map((fitur, index) => (
                           <label key={index} className="flex items-center space-x-2">
                              <input
                                 type="checkbox"
                                 value={fitur}
                                 checked={formData.fiturManajemen.includes(fitur)}
                                 onChange={handleCheckboxChange}
                                 className="w-4 h-4"
                              />
                              <span className="text-gray-900 text-sm">{fitur}</span>
                           </label>
                        ))}
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
               type="submit"
               className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

export default TambahDataRole;