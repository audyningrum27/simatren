import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PengajuanCuti = () => {
  const navigate = useNavigate()
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [alasanCuti, setAlasanCuti] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const idPegawai = localStorage.getItem('id_pegawai');
  
  const today = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/data_cuti/cuti', {
        id_pegawai: idPegawai,
        tanggalMulai,
        tanggalSelesai,
        alasanCuti
      });

      if (response.status === 201) {
        console.log('Pengajuan Cuti Berhasil');
        setTanggalMulai('');
        setTanggalSelesai('');
        setAlasanCuti('');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error submitting cuti:', error);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/UserPage/histori_cuti');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="px-5">
      <div className="relative py-4 flex flex-row justify-between items-center w-full md:w-full">
        <p className="text-xl font-bold mb-4 px-5">Pengajuan Cuti</p>

        <div className="flex justify-end w-full md:w-auto">
          <button
            type="button"
            onClick={() => navigate('/UserPage/histori_cuti')}
            className="w-fit text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Lihat Histori
          </button>
        </div>
      </div>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-betwee'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <table className="w-full">
                <tr>
                  <td className="p-2 text-sm">Tanggal Mulai Cuti<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
                    <input
                      type="date"
                      name="tanggal_mulai"
                      id="tanggal_mulai"
                      value={tanggalMulai}
                      onChange={(e) => setTanggalMulai(e.target.value)}
                      className={`bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${tanggalMulai ? 'text-black' : 'text-gray-400'}`}
                      placeholder="Masukkan Tanggal Mulai Cuti"
                      min={today}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm">Tanggal Selesai Cuti<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
                    <input
                      type="date"
                      name="tanggal_selesai"
                      id="tanggal_selesai"
                      value={tanggalSelesai}
                      onChange={(e) => setTanggalSelesai(e.target.value)}
                      className={`bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${tanggalSelesai ? 'text-black' : 'text-gray-400'}`}
                      placeholder="Masukkan Tanggal Selesai Cuti"
                      min={tanggalMulai ? tanggalMulai : today}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm">Alasan Cuti<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="alasan_cuti"
                      id="alasan_cuti"
                      value={alasanCuti}
                      onChange={(e) => setAlasanCuti(e.target.value)}
                      className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Masukkan Alasan Pengajuan Cuti"
                      required
                    />
                  </td>
                </tr>
              </table>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-row px-3 justify-end gap-4 mx-auto">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Kirim
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Pengajuan Cuti telah Dikirim!</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default PengajuanCuti;