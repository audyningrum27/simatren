import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TambahDataGaji = () => {
  const navigate = useNavigate()
  const [namaLengkap, setNamaLengkap] = useState('');
  const [gajiDasar, setGajiDasar] = useState('');
  const [tunjangan, setTunjangan] = useState('');
  const [potongan, setPotongan] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data form
    console.log({ namaLengkap, gajiDasar, tunjangan, potongan });
    // Reset form setelah submit
    setNamaLengkap('');
    setGajiDasar('');
    setTunjangan('');
    setPotongan('');
    // Menampilkan pop up
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/AdminPage/manajemen_gaji');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center">Tambah Data Gaji</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-betwee'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">

          {/* Form Tambah Data Gaji */}
          <form className="space-y-6">
              <div>
                <table className="w-full">
                  <tr>
                    <td className="p-2 text-sm">Nama Pegawai<span className="text-red-600">*</span></td>
                    <td className="p-2">:</td>
                    <td className="p-2">
                      <input 
                        type="text"
                        name="nama_lengkap"
                        id="nama_lengkap"
                        value={namaLengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                        className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Nama Lengkap Pegawai"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2 text-sm">Gaji Dasar<span className="text-red-600">*</span></td>
                    <td className="p-2">:</td>
                    <td className="p-2">
                      <input 
                        type="number"
                        name="gaji_dasar"
                        id="gaji_dasar"
                        value={gajiDasar}
                        onChange={(e) => setGajiDasar(e.target.value)}
                        className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="3.000.000"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2 text-sm">Tunjangan<span className="text-red-600">*</span></td>
                    <td className="p-2">:</td>
                    <td className="p-2">
                      <input 
                        type="number"
                        name="tunjangan"
                        id="tunjangan"
                        value={tunjangan}
                        onChange={(e) => setTunjangan(e.target.value)}
                        className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="2.500.000"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2 text-sm">Potongan<span className="text-red-600">*</span></td>
                    <td className="p-2">:</td>
                    <td className="p-2">
                      <input 
                        type="number"
                        name="potongan"
                        id="potongan"
                        value={potongan}
                        onChange={(e) => setPotongan(e.target.value)}
                        className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="500.000"
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
          type="button"
          onClick={() => navigate('/AdminPage/manajemen_gaji')}
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Batal
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Simpan
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Data Gaji Berhasil Ditambahkan!</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default TambahDataGaji
