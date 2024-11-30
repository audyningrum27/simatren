import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';

const TambahJadwalPelatihan = () => {
  const navigate = useNavigate();
  const [idPegawai, setIdPegawai] = useState('');
  const [pegawaiList, setPegawaiList] = useState([]);
  const [nama_penyelenggara, setPenyelenggara] = useState('');
  const [nama_kegiatan, setKegiatan] = useState('');
  const [deskripsi_kegiatan, setDeskripsi] = useState('');
  const [tanggal_mulai, setTanggalMulai] = useState('');
  const [tanggal_selesai, setTanggalSelesai] = useState('');
  const [brosur_pelatihan, setBrosurPelatihan] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get('https://backend.simatren.space/api/data_pegawai/pegawai')
      .then(response => {
        setPegawaiList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value === 'ALL') {
      setIdPegawai(pegawaiList.map(pegawai => pegawai.id_pegawai));
    } else {
      setIdPegawai([value]);
    }
  };

  const handleFileChange = (e) => {
    setBrosurPelatihan(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataPelatihan = {
      id_pegawai: idPegawai,
      nama_penyelenggara,
      nama_kegiatan,
      tanggal_mulai,
      tanggal_selesai,
      brosur_pelatihan,
      deskripsi_kegiatan
    };

    try {
      // Tambahkan jadwal pelatihan
      await axios.post('https://backend.simatren.space/api/data_pelatihan/pelatihan', dataPelatihan, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      //Format Tanggal
      const formatTanggalMulai = formatDate(tanggal_mulai);
      const formatTanggalSelesai = formatDate(tanggal_selesai);

      // Kirim notifikasi ke setiap pegawai
      const notifikasiPromises = idPegawai.map(id => {
        const message = `Anda memiliki jadwal pelatihan baru dari ${formatTanggalMulai} sampai ${formatTanggalSelesai}`;
        return axios.post('https://backend.simatren.space/api/data_notifikasi/notifikasi-pegawai/pelatihan', {
          id_pegawai: id,
          message
        });
      });

      await Promise.all(notifikasiPromises);

      // Reset form dan tampilkan popup
      setIdPegawai([]);
      setPenyelenggara('');
      setKegiatan('');
      setTanggalMulai('');
      setTanggalSelesai('');
      setDeskripsi('');
      setBrosurPelatihan(null);
      setShowPopup(true);

    } catch (error) {
      console.error('There was an error adding the data!', error);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/AdminPage/jadwal_pelatihan');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  return (
    <div className='px-5'>
      <span className="text-2xl text-gray-950 font-semibold flex justify-center">Tambah Jadwal Pelatihan</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">
          <div className="relative w-full gap-2 grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className='flex flex-row mb-2'>
                <span className='text-gray-900 text-sm font-medium'>Nama Pegawai</span>
                <span className='text-red-700'>*</span>
              </div>
              <select
                name="id_pegawai"
                id="id_pegawai"
                value={idPegawai.length === 1 ? idPegawai[0] : idPegawai.length ? 'ALL' : ''}
                onChange={handleSelectChange}
                className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md ${idPegawai.length ? 'text-black' : 'text-gray-400'}`}
                required
                defaultValue=""
              >
                <option value="" disabled selected className='text-gray-400'>Masukkan nama pegawai</option>
                <option value="ALL" className='text-black'>Pilih Semua Pegawai</option>
                {pegawaiList.map((pegawai) => (
                  <option className='text-black' key={pegawai.id_pegawai} value={pegawai.id_pegawai}>
                    {pegawai.nama_pegawai} - {pegawai.nip}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className='flex flex-row mb-2'>
                <span className='text-gray-900 text-sm font-medium'>Nama Penyelenggara</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="nama_penyelenggara"
                value={nama_penyelenggara}
                onChange={(e) => setPenyelenggara(e.target.value)}
                placeholder="Masukkan nama penyelenggara"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row mb-2'>
                <span className='text-gray-900 text-sm font-medium'>Nama Kegiatan</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="text"
                name="nama_kegiatan"
                value={nama_kegiatan}
                onChange={(e) => setKegiatan(e.target.value)}
                placeholder="Masukkan nama kegiatan"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md"
                required
              />
            </div>
            <div>
              <div className='flex flex-row mb-2'>
                <span className='text-gray-900 text-sm font-medium'>Tanggal Mulai</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="date"
                name="tanggal_mulai"
                value={tanggal_mulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                placeholder="Pilih tanggal mulai"
                className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 pr-2 rounded-md ${tanggal_mulai ? 'text-black' : 'text-gray-400'}`}
                required
              />
            </div>
            <div>
              <div className='flex flex-row mb-2'>
                <span className='text-gray-900 text-sm font-medium'>Tanggal Selesai</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="date"
                name="tanggal_selesai"
                value={tanggal_selesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
                placeholder="Pilih tanggal selesai"
                className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 pr-2 rounded-md ${tanggal_selesai ? 'text-black' : 'text-gray-400'}`}
                required
              />
            </div>
            <div>
              <div className='flex flex-row mb-2'>
                <span className='text-gray-900 text-sm font-medium'>Brosur Pelatihan</span>
                <span className='text-red-700'>*</span>
              </div>
              <input
                type="file"
                name="brosur_pelatihan"
                onChange={handleFileChange}
                accept=".jpeg, .jpg, .png, .pdf"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 pr-2 py-1.5 rounded-md"
              />
            </div>
            <div>
              <div className='flex flex-row mb-2'>
                <span className='text-gray-900 text-sm font-medium'>Deskripsi Kegiatan</span>
                <span className='text-red-700'>*</span>
              </div>
              <textarea
                type="text"
                name="deskripsi_kegiatan"
                value={deskripsi_kegiatan}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows={4}
                placeholder="Masukkan deskripsi kegiatan"
                className="text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full pl-2 rounded-md"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-6 justify-end md:w-[100%] w-[90%] mx-auto">
        <button
          type="button"
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => navigate('/AdminPage/jadwal_pelatihan')}>
          Batal
        </button>
        <button
          type="submit"
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleSubmit}
        >
          Simpan
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Jadwal Pelatihan Berhasil Dibuat!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TambahJadwalPelatihan;