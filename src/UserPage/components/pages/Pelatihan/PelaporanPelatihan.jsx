import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PelaporanPelatihan = () => {
  const navigate = useNavigate()
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [buktiKegiatan, setBuktiKegiatan] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (e) => {
    setBuktiKegiatan(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data form
    console.log({ namaKegiatan, tanggalMulai, tanggalSelesai, buktiKegiatan });
    // Reset form setelah submit
    setNamaKegiatan('');
    setTanggalMulai('');
    setTanggalSelesai('');
    setBuktiKegiatan('');
    // Menampilkan pop up
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/UserPage/histori_pelatihan');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="px-5">
      <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
        <p className="text-xl font-bold mb-4 px-5">Pelaporan Pelatihan</p>

        <div className="mx-2">
          <button
            type="button"
            onClick={() => navigate('/UserPage/histori_pelatihan')}
            className="w-fit text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Lihat Histori
          </button>
        </div>
      </div>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-betwee'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">

          {/* Form Pengajuan Cuti */}
          <form className="space-y-6">
              <div>
                <table className="w-full">
                  <tr>
                    <td className="p-2 text-sm">Nama Kegiatan<span className="text-red-600">*</span></td>
                    <td className="p-2">:</td>
                    <td className="p-2">
                      <input 
                        type="text"
                        name="nama_kegiatan"
                        id="nama_kegiatan"
                        value={namaKegiatan}
                        onChange={(e) => setNamaKegiatan(e.target.value)}
                        className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder=""
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 text-sm">Tanggal Mulai<span className="text-red-600">*</span></td>
                    <td className="p-2">:</td>
                    <td className="p-2">
                      <input 
                        type="date"
                        name="tanggal_mulai"
                        id="tanggal_mulai"
                        value={tanggalMulai}
                        onChange={(e) => setTanggalMulai(e.target.value)}
                        className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Masukkan Tanggal Mulai Cuti"
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
                        className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Masukkan Tanggal Selesai Cuti"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2 text-sm">Bukti Kegiatan<span className="text-red-600">*</span></td>
                    <td className="p-2">:</td>
                    <td className="p-2">
                      <input
                        type="file"
                        name="bukti_kegiatan"
                        id="bukti_kegiatan"
                        onChange={handleFileChange}
                        className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
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
            <p>Pelaporan Pelatihan Anda telah Dikirim!</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default PelaporanPelatihan;

