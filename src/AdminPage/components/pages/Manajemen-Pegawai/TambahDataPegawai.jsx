import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const TambahDataPegawai = () => {
  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    nama_pegawai: '',
    nip: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    no_telp: '',
    email: '',
    role: '',
    status_bpjs: '',
    status_kawin: '',
    anggota_keluarga: '',
    jumlah_tanggungan: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/data_pegawai/pegawai', formData);
      setShowPopup(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving data:', error);
      setErrorMessage('Error saving data. Please try again.');
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/AdminPage/manajemen_pegawai');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className='px-5'>
      <span className="text-2xl text-gray-950 font-semibold flex justify-center">Tambah Data Pegawai</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">

          {/* Form Tambah Data Pegawai */}
          <div className="relative w-full gap-3 grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Nama Lengkap</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="nama_pegawai"
                value={formData.nama_pegawai}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>NIP (Nomor Induk Pegawai)</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleInputChange}
                placeholder="Masukkan Nomor Induk Pegawai"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Tempat Lahir</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={handleInputChange}
                placeholder="Masukkan tempat lahir"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Tanggal Lahir</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="date"
                name="tanggal_lahir"
                className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 pr-2 rounded-md ${formData.tanggal_lahir ? 'text-black' : 'text-gray-400'}`}
                required
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Jenis Kelamin</span>
                <span className='text-red-700'>*</span>
              </div>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleInputChange}
                className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-1 rounded-md ${formData.jenis_kelamin ? 'text-black' : 'text-gray-400'}`}
                required
              >
                <option value="" disabled hidden>Pilih jenis kelamin</option>
                <option value="Laki-laki" className='text-black'>Laki-laki</option>
                <option value="Perempuan" className='text-black'>Perempuan</option>
              </select>
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Alamat</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                placeholder="Masukkan alamat"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Nomor Telepon</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="no_telp"
                value={formData.no_telp}
                onChange={handleInputChange}
                placeholder="Masukkan nomor telepon"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Email</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan email"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Posisi</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Masukkan posisi"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Status BPJS</span>
                <span className='text-red-700'>*</span>
              </div>
              <select
                name="status_bpjs"
                value={formData.status_bpjs}
                onChange={handleInputChange}
                className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-1 rounded-md ${formData.status_bpjs ? 'text-black' : 'text-gray-400'}`}
                required
              >
                <option value="" disabled hidden>Pilih status</option>
                <option value="Aktif" className='text-black'>Aktif</option>
                <option value="Nonaktif" className='text-black'>Nonaktif</option>
              </select>
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Status Perkawinan</span>
                <span className='text-red-700'>*</span>
              </div>
              <select
                name="status_kawin"
                value={formData.status_kawin}
                onChange={handleInputChange}
                className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-1 rounded-md ${formData.status_kawin ? 'text-black' : 'text-gray-400'}`}
                required
              >
                <option value="" disabled hidden>Pilih status</option>
                <option value="Belum Menikah" className='text-black'>Belum Menikah</option>
                <option value="Menikah" className='text-black'>Menikah</option>
                <option value="Cerai" className='text-black'>Cerai</option>
              </select>
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Data Anggota Keluarga</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="anggota_keluarga"
                value={formData.anggota_keluarga}
                onChange={handleInputChange}
                placeholder="Masukkan data keluarga"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-sm font-medium'>Jumlah Tanggungan</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="number"
                name="jumlah_tanggungan"
                value={formData.jumlah_tanggungan}
                onChange={handleInputChange}
                placeholder="Jumlah tanggungan keluarga"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Konfirmasi */}
      <div className="flex flex-row gap-6 justify-end md:w-[100%] w-[90%] mx-auto">
        <button
          type="button"
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => navigate('/AdminPage/manajemen_pegawai')}>
          Batal
        </button>
        <button
          type="submit"
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleSave}
        >
          Simpan
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Data Pegawai Berhasil Ditambahkan!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TambahDataPegawai
