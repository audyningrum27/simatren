import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TambahDataGaji = () => {
  const navigate = useNavigate();
  const [nomorIndukPegawai, setNip] = useState([]);
  const [pegawaiList, setPegawaiList] = useState([]);
  const [gajiDasar, setGajiDasar] = useState('');
  const [tunjangan, setTunjangan] = useState('');
  const [potongan, setPotongan] = useState('');
  const [tanggalGaji, setTanggalGaji] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get('https://backend.simatren.space/api/data_pegawai/pegawai')
      .then(response => {
        const aktifPegawai = response.data.filter(pegawai => pegawai.status_kepegawaian === 'Aktif');
        setPegawaiList(aktifPegawai);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value === 'ALL') {
      setNip(pegawaiList.map(pegawai => pegawai.nip));
    } else {
      setNip([value]);
    }
  };

  const formatCurrency = (value) => {
    const numberString = value.replace(/[^,\d]/g, '');
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return 'Rp ' + rupiah;
  };

  const handleGajiDasarChange = (e) => {
    setGajiDasar(formatCurrency(e.target.value));
  };

  const handleTunjanganChange = (e) => {
    setTunjangan(formatCurrency(e.target.value));
  };

  const handlePotonganChange = (e) => {
    setPotongan(formatCurrency(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Membersihkan nilai dari "Rp" dan pemisah ribuan
    const cleanedGajiDasar = gajiDasar.replace(/[^0-9,-]+/g, "").replace(',', '.');
    const cleanedTunjangan = tunjangan.replace(/[^0-9,-]+/g, "").replace(',', '.');
    const cleanedPotongan = potongan.replace(/[^0-9,-]+/g, "").replace(',', '.');

    // Mengubah nilai menjadi angka
    const parsedGajiDasar = cleanedGajiDasar ? parseFloat(cleanedGajiDasar) : null;
    const parsedTunjangan = cleanedTunjangan ? parseFloat(cleanedTunjangan) : null;
    const parsedPotongan = cleanedPotongan ? parseFloat(cleanedPotongan) : null;

    const dataGaji = { 
      nip: nomorIndukPegawai, 
      bulan_gaji: tanggalGaji, 
      gaji_dasar: parsedGajiDasar, 
      tunjangan: parsedTunjangan, 
      potongan: parsedPotongan 
    };  

    axios.post('https://backend.simatren.space/api/data_gaji/gaji', dataGaji)
      .then(response => {
        console.log(response.data);
        setNip('');
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
                      name="nip"
                      id="nip"
                      value={nomorIndukPegawai.length === 1 ? nomorIndukPegawai[0] : nomorIndukPegawai.length ? 'ALL' : ''}
                      onChange={handleSelectChange}
                      className={`text-sm focus:outline-gray-400 active:outline-gray-400 border border-gray-300 w-full h-10 pl-2 rounded-md ${nomorIndukPegawai.length ? 'text-black' : 'text-gray-400'}`}
                      required
                      defaultValue=""
                    >
                      <option value="" disabled selected className='text-gray-400'>Masukkan nama pegawai</option>
                      <option value="ALL" className='text-black'>Pilih Semua Pegawai</option>
                      {pegawaiList.map((pegawai) => (
                        <option className='text-black' key={pegawai.nip} value={pegawai.nip}>
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
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm">Gaji Dasar<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="gaji_dasar"
                      id="gaji_dasar"
                      value={gajiDasar}
                      onChange={handleGajiDasarChange}
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
                      type="text"
                      name="tunjangan"
                      id="tunjangan"
                      value={tunjangan}
                      onChange={handleTunjanganChange}
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
                      type="text"
                      name="potongan"
                      id="potongan"
                      value={potongan}
                      onChange={handlePotonganChange}
                      className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="500.000"
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