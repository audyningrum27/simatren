import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getPegawaiStatus } from "../../utils/status";

const DetailDataRole = () => {
   const navigate = useNavigate();
   const { id_role } = useParams();
   const [role, setRole] = useState(null);
   const [isEditMode, setIsEditMode] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [showPopupEdit, setShowPopupEdit] = useState(false);

   useEffect(() => {
      fetchDataRoleDetail();
   }, [id_role]);

   const fetchDataRoleDetail = async () => {
      try {
         const response = await fetch(`https://be-simatren.riset-d3rpla.com/api/data_role/manajemen/pegawai/role/${id_role}`);
         const data = await response.json();

         // Ubah tanggung_jawab dari array of object menjadi array of string
         const tanggungJawabStrings = (data.tanggung_jawab || []).map(item => item.tanggung_jawab);

         setRole({
            ...data,
            tanggung_jawab: tanggungJawabStrings // overwrite jadi array of string
         });
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

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
      setRole({
         ...role,
         [name]: value
      });
   };

   const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      
      setRole((prevRole) => {
         const updatedTanggungJawab = checked
            ? [...prevRole.tanggung_jawab, value]
            : prevRole.tanggung_jawab.filter(item => item !== value);

         // Update status otomatis
         const newStatus = updatedTanggungJawab.length > 0 ? "Aktif" : "None";

         return {
            ...prevRole,
            tanggung_jawab: updatedTanggungJawab,
            status: newStatus
         };
      });
   };

   const handleEditClick = async () => {
      if (isEditMode) {
         try {
            const updatedRole = {
               namaRole: role.nama_role,
               unitKerja: role.unit_kerja,
               status: role.status,
               tanggungJawab: role.tanggung_jawab
            };

            console.log('Updating role:', updatedRole);

            const response = await fetch(`https://be-simatren.riset-d3rpla.com/api/data_role/manajemen/pegawai/role/update/${id_role}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(updatedRole),
            });

            if (response.ok) {
               setShowPopupEdit(true);
            } else {
               const errorText = await response.text();
               console.error('Error updating data:', errorText);
            }

            const data = await response.json();
            console.log('Success update:', data);
         } catch (error) {
            console.error('Error updating data:', error);
         }
      }
      setIsEditMode(!isEditMode);
   };

   const handleDeleteClick = () => {
      setIsDeleting(true);
   };

   const confirmDelete = async () => {
      try {
         await fetch(`https://be-simatren.riset-d3rpla.com/api/data_role/manajemen/pegawai/role/delete/${id_role}`, {
            method: 'DELETE',
         });
         setShowPopup(true);
         setIsDeleting(false);
      } catch (error) {
         console.error('Error deleting data role:', error);
      }
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

   if (!role) {
      return <p>Loading...</p>;
   }

   return (
      <div className="px-5">
         <span className="text-2xl text-gray-950 font-semibold flex justify-center">Detail Data Role</span>
         <div className="md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between">
            <div className="relative rounded-sm border border-gray-200 shadow-lg p-10">
               <form>
                  <div className="grid md:grid-cols-2 gap-4">
                     <InputField
                        label="Nama Role / Posisi"
                        name="nama_role"
                        value={role.nama_role}
                        onChange={handleChange}
                        disabled={!isEditMode}
                     />
                     <div>
                        <label className="text-gray-900 text-sm font-medium">Unit Kerja</label>
                        <select
                           name="unit_kerja"
                           value={role.unit_kerja}
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
                        {tanggung_jawabList.map((fitur, index) => {
                           const fiturFormatted = fitur.toLowerCase().replace(/\s+/g, '-'); // lowercase & spasi jadi -
                           return (
                              <label key={index} className="flex items-center space-x-2">
                                 <input
                                    type="checkbox"
                                    value={fiturFormatted}
                                    checked={role.tanggung_jawab.includes(fiturFormatted)}
                                    onChange={handleCheckboxChange}
                                    disabled={!isEditMode}
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
