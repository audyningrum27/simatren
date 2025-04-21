import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineQrcode, HiOutlineUserGroup } from 'react-icons/hi';

const DetailRapat = () => {
   const navigate = useNavigate();
   const [isEditMode, setIsEditMode] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [showPopupEdit, setShowPopupEdit] = useState(false);
   const [newPeserta, setNewPeserta] = useState('');
   const [showDropdown, setShowDropdown] = useState(false);
   const [highlightedIndex, setHighlightedIndex] = useState(-1);

   const pesertaList = ['Unit Guru MA', 'Unit Staff MA', 'Nurul', 'Qofifah', 'Audyningrum'];

   const [formData, setFormData] = useState({
      judulRapat: 'Rapat Guru MA',
      nomorSurat: '0000111112222227777777',
      pelaksana: 'Unit Guru & Staff MA',
      ruangRapat: 'Ruang 2 Gedung MA',
      tanggalRapat: '2024-11-23',
      waktuRapat: '09:00',
      pesertaRapat: ['Unit Guru MA', 'Unit Staff MA', 'Nurul Qoffifah', 'Audyningrum'],
      agendaRapat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      teksNotulen: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      linkNotulen: 'https://projects.d3ifcool.org/mahasiswa/data-pa',
      fileNotulen: ''
   });

   const filteredSuggestions = pesertaList.filter((p) =>
      p.toLowerCase().includes(newPeserta.toLowerCase()) &&
      !formData.pesertaRapat.includes(p)
   );

   const handleInputChange = (e) => {
      setNewPeserta(e.target.value);
      setShowDropdown(true);
      setHighlightedIndex(-1);
   };

   const handleKeyDown = (e) => {
      if (!showDropdown || filteredSuggestions.length === 0) return;

      if (e.key === 'ArrowDown') {
         e.preventDefault();
         setHighlightedIndex((prev) => (prev + 1) % filteredSuggestions.length);
      } else if (e.key === 'ArrowUp') {
         e.preventDefault();
         setHighlightedIndex((prev) =>
            prev === 0 ? filteredSuggestions.length - 1 : prev - 1
         );
      } else if (e.key === 'Enter') {
         e.preventDefault();
         if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
            handleSuggestionClick(filteredSuggestions[highlightedIndex]);
         }
      }
   };

   const removePeserta = (nama) => {
      setFormData({ ...formData, pesertaRapat: formData.pesertaRapat.filter(n => n !== nama) });
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type !== 'application/pdf') {
         alert('Hanya file PDF yang diperbolehkan.');
         e.target.value = null;
      } else {
         setFormData({ ...formData, fileNotulen: file?.name || '' });
      }
   };

   const handleEditClick = () => {
      if (isEditMode) {
         if (!formData.judulRapat || !formData.nomorSurat || !formData.pelaksana || !formData.ruangRapat || !formData.tanggalRapat || !formData.waktuRapat || !formData.agendaRapat || !formData.teksNotulen || formData.pesertaRapat.length === 0) {
            alert('Semua field wajib diisi, kecuali Link dan File Notulen.');
            return;
         }
         setShowPopupEdit(true);
      }
      setIsEditMode(!isEditMode);
   };

   const handleDeleteClick = () => setIsDeleting(true);
   const confirmDelete = () => {
      setShowPopup(true);
      setIsDeleting(false);
   };
   const cancelDelete = () => setIsDeleting(false);

   const handleSuggestionClick = (nama) => {
      setFormData({ ...formData, pesertaRapat: [...formData.pesertaRapat, nama] });
      setNewPeserta('');
      setShowDropdown(false);
   };

   useEffect(() => {
      if (showPopup || showPopupEdit) {
         const timer = setTimeout(() => {
            setShowPopup(false);
            setShowPopupEdit(false);
            if (showPopup) navigate('/AdminPage/riwayat_rapat');
         }, 2000);
         return () => clearTimeout(timer);
      }
   }, [showPopup, showPopupEdit, navigate]);

   return (
      <div>
         {/* Detail Rapat */}
         {!isEditMode ? (
            // View Mode
            <div>
               <p className="text-xl font-bold px-5 mb-4">Detail Rapat</p>

               {/* Tombol Aksi */}
               <div className="flex flex-col md:flex-row gap-2 mb-4">
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

               <div className="bg-white border rounded-lg shadow-md p-4">
                  <dl className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-x-4 gap-y-2">
                     <dt className="font-semibold">Judul Rapat</dt>
                     <dd>{formData.judulRapat}</dd>
                     <dt className="font-semibold">Nomor Surat</dt>
                     <dd>{formData.nomorSurat}</dd>
                     <dt className="font-semibold">Pelaksana</dt>
                     <dd>{formData.pelaksana}</dd>
                     <dt className="font-semibold">Tanggal Rapat</dt>
                     <dd>{formData.tanggalRapat}</dd>
                     <dt className="font-semibold">Waktu Rapat</dt>
                     <dd>{formData.waktuRapat}</dd>
                     <dt className="font-semibold">Agenda Rapat</dt>
                     <dd>{formData.agendaRapat}</dd>
                     <dt className="font-semibold">Teks Notulen</dt>
                     <dd>{formData.teksNotulen}</dd>
                     <dt className="font-semibold">Link Notulen</dt>
                     <dd>
                        <a href={formData.linkNotulen} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                           {formData.linkNotulen}
                        </a>
                     </dd>
                     <dt className="font-semibold">File Notulen</dt>
                     <dd className="flex items-center gap-2 flex-wrap">
                        {formData.fileNotulen && (
                           <button className="bg-gray-300 hover:bg-green-900 hover:text-white font-semibold py-1 px-3 rounded-sm">
                              Unduh File
                           </button>
                        )}
                        {formData.fileNotulen}
                     </dd>
                  </dl>
               </div>
            </div>
         ) : (
            // Edit Mode
            <div>
               <p className="text-2xl flex justify-center font-bold mb-4">Edit Detail Rapat</p>
               <div className="rounded-sm border border-gray-200 shadow-lg p-5">
                  <form>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InputField label="Judul Rapat" name="judulRapat" value={formData.judulRapat} onChange={handleChange} required />
                        <InputField label="Nomor Surat" name="nomorSurat" value={formData.nomorSurat} onChange={handleChange} required />
                        <InputField label="Pelaksana Rapat" name="pelaksana" value={formData.pelaksana} onChange={handleChange} required />
                        <InputField label="Ruang / Gedung Rapat" name="ruangRapat" value={formData.ruangRapat} onChange={handleChange} required />
                        <InputField label="Tanggal Rapat" name="tanggalRapat" type="date" value={formData.tanggalRapat} onChange={handleChange} required />
                        <InputField label="Waktu Rapat" name="waktuRapat" type="time" value={formData.waktuRapat} onChange={handleChange} required />

                        {/* Peserta Tag Input */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 relative">
                           <label className="text-gray-900 text-sm font-medium">Peserta Rapat <span className="text-red-700">*</span></label>
                           <div className="flex flex-wrap gap-2 mt-1">
                              {formData.pesertaRapat.map((nama, i) => (
                                 <span key={i} className="select2-selection__choice bg-gray-300 px-2 py-1 rounded text-sm flex items-center gap-1">
                                    {nama}
                                    <button type="button" className="text-red-600" onClick={() => removePeserta(nama)}>×</button>
                                 </span>
                              ))}
                           </div>
                           <div className="mt-2 relative">
                              <input
                                 value={newPeserta}
                                 onChange={handleInputChange}
                                 onKeyDown={handleKeyDown}
                                 placeholder="Ketik nama peserta..."
                                 className="border px-3 py-2 rounded-md w-full"
                                 onFocus={() => setShowDropdown(true)}
                                 onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                              />
                              {showDropdown && (
                                 <div className="absolute bg-white border rounded-md shadow-md mt-1 w-full z-10 max-h-40 overflow-auto">
                                    {filteredSuggestions.length > 0 ? (
                                       filteredSuggestions.map((nama, i) => (
                                          <div
                                             key={i}
                                             onClick={() => handleSuggestionClick(nama)}
                                             className={`px-4 py-2 cursor-pointer text-sm ${i === highlightedIndex ? 'bg-green-100 text-black' : 'hover:bg-green-100'
                                                }`}
                                          >
                                             {nama}
                                          </div>
                                       ))
                                    ) : (
                                       <div className="px-4 py-2 text-sm text-gray-500">Peserta tidak ditemukan</div>
                                    )}
                                 </div>
                              )}
                           </div>
                        </div>

                        <TextAreaField label="Agenda Rapat" name="agendaRapat" value={formData.agendaRapat} onChange={handleChange} required />
                        <TextAreaField label="Teks Notulen" name="teksNotulen" value={formData.teksNotulen} onChange={handleChange} />
                        <InputField label="Link Notulen" name="linkNotulen" value={formData.linkNotulen} onChange={handleChange} />
                        <div>
                           <label className="text-gray-900 text-sm font-medium">File Notulen</label>
                           <input type="file" accept="application/pdf" className="w-full border px-3 py-2 rounded-md border-gray-300" onChange={handleFileChange} />
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* Buttons */}
         <div className="flex flex-row items-center justify-between md:w-[100%] w-[90%] mx-auto mt-3">
            {isEditMode && (
               <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="w-28 text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
               >
                  Hapus
               </button>
            )}
            <div className="flex gap-4 ml-auto">
               <button
                  type="button"
                  className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => {
                     if (isEditMode) {
                        setIsEditMode(false);
                     } else {
                        navigate('/AdminPage/riwayat_rapat');
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

         {/* Popup Konfirmasi Hapus */}
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

         {/* Notifikasi */}
         {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white text-green-900 font-semibold p-5 rounded shadow-lg">Data rapat berhasil dihapus.</div>
            </div>
         )}
         {showPopupEdit && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white text-green-900 font-semibold p-5 rounded shadow-lg">Data rapat berhasil diperbarui.</div>
            </div>
         )}
      </div>
   );
};

// InputField Component
const InputField = ({ label, name, type = "text", value, onChange, required }) => (
   <div>
      <label className="text-gray-900 text-sm font-medium">
         {label} {required && <span className="text-red-700">*</span>}
      </label>
      <input
         type={type}
         name={name}
         value={value}
         onChange={onChange}
         className="text-sm focus:outline-gray-400 border border-gray-300 w-full h-10 px-3 rounded-md"
         required={required}
      />
   </div>
);

// TextAreaField Component
const TextAreaField = ({ label, name, value, onChange, required }) => (
   <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <label className="text-gray-900 text-sm font-medium">
         {label} {required && <span className="text-red-700">*</span>}
      </label>
      <textarea
         name={name}
         value={value}
         onChange={onChange}
         rows="3"
         className="w-full px-3 py-2 border rounded-md focus:outline-gray-400 border-gray-300"
         required={required}
      ></textarea>
   </div>
);

export default DetailRapat;