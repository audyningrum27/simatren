import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TambahDataGaji = () => {
  const navigate = useNavigate();
  const [idPegawai, setIdPegawai] = useState([]);
  const [pegawaiList, setPegawaiList] = useState([]);
  const [gajiDasar, setGajiDasar] = useState('');
  const [tunjangan, setTunjangan] = useState('');
  const [potongan, setPotongan] = useState('');
  const [tanggalGaji, setTanggalGaji] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data_pegawai/pegawai')
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataGaji = { id_pegawai: idPegawai, bulan_gaji: tanggalGaji, gaji_dasar: gajiDasar, tunjangan, potongan };

    axios.post('http://localhost:5000/api/data_gaji/gaji', dataGaji)
      .then(response => {
        console.log(response.data);
        setIdPegawai('');
        setGajiDasar('');
        setTunjangan('');
        setPotongan('');
        setTanggalGaji('');
        setShowPopup(true);
      })
      .catch(error => {
        console.error('There was an error adding the data!', error);
      });
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/AdminPage/manajemen_gaji');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center">Tambah Data Gaji</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-betwee'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <table className="w-full">
                <tr>
                  <td className="p-2 text-sm">Nama Pegawai<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
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
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm">Tanggal Gaji<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
                    <input
                      type="date"
                      name="bulan_gaji"
                      id="bulan_gaji"
                      value={tanggalGaji}
                      onChange={(e) => setTanggalGaji(e.target.value)}
                      className={`bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${tanggalGaji ? 'text-black' : 'text-gray-400'}`}
                      placeholder="3.000.000"
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
                      placeholder="3000000"
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
                      placeholder="2500000"
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
                      placeholder="500000"
                      required
                    />
                  </td>
                </tr>
              </table>
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
                className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Data Gaji Berhasil Ditambahkan!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TambahDataGaji;