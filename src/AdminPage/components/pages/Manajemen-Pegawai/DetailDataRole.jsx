import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const DetailDataRole = () => {
   const navigate = useNavigate();
   const [isEditMode, setIsEditMode] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [showPopupEdit, setShowPopupEdit] = useState(false);

   const [formData, setFormData] = useState({
      namaPosisi: "Guru MA",
      unitKerja: "TPA",
      fiturManajemen: ["Manajemen Pegawai"],
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

   const handleEditClick = () => {
      if (isEditMode) {
         // Simpan perubahan (simulasi)
         console.log("Data diperbarui:", formData);
         setShowPopupEdit(true);
      }
      setIsEditMode(!isEditMode);
   };

   const handleDeleteClick = () => {
      setIsDeleting(true);
   };

   const confirmDelete = () => {
      // Simulasi delete
      console.log("Data dihapus");
      setShowPopup(true);
      setIsDeleting(false);
   };

   const cancelDelete = () => {
      setIsDeleting(false);
   };

   useEffect(() => {
      if (showPopup || showPopupEdit) {
         const timer = setTimeout(() => {
            setShowPopup(false);
            setShowPopupEdit(false);
            if (showPopup) navigate('/AdminPage/manajemen_role');
         }, 2000);
         return () => clearTimeout(timer);
      }
   }, [showPopup, showPopupEdit, navigate]);

   return (
      <div className="px-5">
         <span className="text-2xl text-gray-950 font-semibold flex justify-center">Detail Data Role</span>
         <div className="md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between">
            <div className="relative rounded-sm border border-gray-200 shadow-lg p-10">
               <form>
                  <div className="grid md:grid-cols-2 gap-4">
                     <InputField
                        label="Nama Role / Posisi"
                        name="namaPosisi"
                        value={formData.namaPosisi}
                        onChange={handleChange}
                        disabled={!isEditMode}
                     />
                     <div>
                        <label className="text-gray-900 text-sm font-medium">Unit Kerja</label>
                        <select
                           name="unitKerja"
                           value={formData.unitKerja}
                           onChange={handleChange}
                           disabled={!isEditMode}
                           className={`text-sm border border-gray-300 w-full h-10 pl-1 rounded-md ${!isEditMode ? 'bg-gray-100 text-gray-500' : 'text-black'}`}
                        >
                           <option value="TPA">TPA</option>
                           <option value="Non TPA">Non TPA</option>
                        </select>
                     </div>
                  </div>

                  <div className="mt-5">
                     <p className="text-gray-900 font-medium mb-2">Role ini akan mengelola fitur manajemen apa?</p>
                     <div className="grid md:grid-cols-2 gap-2">
                        {fiturManajemenList.map((fitur, index) => (
                           <label key={index} className="flex items-center space-x-2">
                              <input
                                 type="checkbox"
                                 value={fitur}
                                 checked={formData.fiturManajemen.includes(fitur)}
                                 onChange={handleCheckboxChange}
                                 disabled={!isEditMode}
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

         {/* Action Buttons */}
         <div className="flex flex-row gap-6 justify-between md:w-[100%] w-[90%] mx-auto mt-3">
            <button
               type="button"
               onClick={handleDeleteClick}
               className="w-28 text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
               Hapus
            </button>

            <div className="flex gap-4">
               <button
                  type="button"
                  className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => {
                     if (isEditMode) {
                        setIsEditMode(false); // keluar dari mode edit tanpa save
                     } else {
                        navigate('/AdminPage/manajemen_role'); // kalau gak edit, baru balik ke manajemen role
                     }
                  }}
               >
                  {isEditMode ? 'Batal' : 'Kembali'}
               </button>
               <button
                  type="button"
                  className={`w-28 ${isEditMode ? 'bg-green-900 text-white' : 'text-black bg-gray-300 hover:bg-green-900 hover:text-white'} font-medium rounded-lg text-sm px-5 py-2.5`}
                  onClick={handleEditClick}
               >
                  {isEditMode ? 'Simpan' : 'Edit'}
               </button>
            </div>
         </div>

         {/* Confirm Delete Popup */}
         {isDeleting && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white p-5 rounded-lg shadow-lg">
                  <p className="mb-4">Apakah Anda yakin ingin menghapus data ini?</p>
                  <div className="flex justify-end gap-3">
                     <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400">Batal</button>
                     <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Hapus</button>
                  </div>
               </div>
            </div>
         )}

         {/* Notification Popups */}
         {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white text-green-900 font-semibold p-5 rounded shadow-lg">Data role berhasil dihapus.</div>
            </div>
         )}
         {showPopupEdit && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white text-green-900 font-semibold p-5 rounded shadow-lg">Data role berhasil diperbarui.</div>
            </div>
         )}
      </div>
   );
};

const InputField = ({ label, name, value, onChange, disabled }) => (
   <div>
      <label className="text-gray-900 text-sm font-medium">{label}</label>
      <input
         type="text"
         name={name}
         value={value}
         onChange={onChange}
         disabled={disabled}
         className={`text-sm border border-gray-300 w-full h-10 pl-2 rounded-md ${disabled ? 'bg-gray-100 text-gray-500' : 'text-black'}`}
      />
   </div>
);

export default DetailDataRole;
