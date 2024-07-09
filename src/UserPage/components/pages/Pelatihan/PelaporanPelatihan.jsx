import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PelaporanPelatihan = () => {
  const navigate = useNavigate()
  const [pelatihanProses, setPelatihanProses] = useState([]);
  const [selectedPelatihan, setSelectedPelatihan] = useState('');
  const [namaPenyelenggara, setNamaPenyelenggara] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [buktiKegiatan, setBuktiKegiatan] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchPelatihanProses = async () => {
      const idPegawai = localStorage.getItem('id_pegawai');
      try {
        const response = await axios.get(`http://localhost:5000/api/data_pelatihan/pelatihan-proses/${idPegawai}`);
        setPelatihanProses(response.data);
      } catch (error) {
        console.error('Error fetching pelatihan proses:', error);
      }
    };

    fetchPelatihanProses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePelatihanChange = (e) => {
    const selectedId = e.target.value;
    setSelectedPelatihan(selectedId);

    const selectedPelatihan = pelatihanProses.find(pelatihan => pelatihan.id_pelatihan === parseInt(selectedId));

    if (selectedPelatihan) {
      setNamaPenyelenggara(selectedPelatihan.nama_penyelenggara);
      setTanggalMulai(formatDate(selectedPelatihan.tanggal_mulai));
      setTanggalSelesai(formatDate(selectedPelatihan.tanggal_selesai));
    } else {
      setNamaPenyelenggara('');
      setTanggalMulai('');
      setTanggalSelesai('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (file && fileTypes.includes(file.type)) {
      setBuktiKegiatan(file);
    } else {
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bukti_pelaksanaan', buktiKegiatan);

    try {
      await axios.post(`http://localhost:5000/api/data_pelatihan/upload-bukti/${selectedPelatihan}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowPopup(true);
    } catch (error) {
      console.error('Error uploading bukti pelaksanaan:', error);
    }

    // Reset form setelah submit
    setSelectedPelatihan('');
    setNamaPenyelenggara('');
    setTanggalMulai('');
    setTanggalSelesai('');
    setBuktiKegiatan('');
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/UserPage/histori_pelatihan_pegawai');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="px-5">
      <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
        <p className="text-xl font-bold mb-4 px-5">Pelaporan Pelatihan</p>

        <div className="mx-2 flex justify-end gap-6">
          <button
            type="button"
            onClick={() => navigate('/UserPage/jadwal_pelatihan_pegawai')}
            className="w-fit text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Lihat Jadwal
          </button>
          <button
            type="button"
            onClick={() => navigate('/UserPage/histori_pelatihan_pegawai')}
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
                    <select
                      value={selectedPelatihan}
                      onChange={handlePelatihanChange}
                      className={`bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${selectedPelatihan ? 'text-black' : 'text-gray-400'}`}
                      required
                    >
                      <option value="">Pilih nama kegiatan</option>
                      {pelatihanProses.map((pelatihan) => (
                        <option className='text-black' key={pelatihan.id_pelatihan} value={pelatihan.id_pelatihan}>
                          {pelatihan.nama_kegiatan}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm">Nama Penyelenggara<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="nama_penyelenggara"
                      id="nama_penyelenggara"
                      value={namaPenyelenggara}
                      readOnly className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Nama penyelenggara"
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
                      readOnly className={`bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${tanggalMulai ? 'text-black' : 'text-gray-400'}`}
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
                      readOnly className={`bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${tanggalSelesai ? 'text-black' : 'text-gray-400'}`}
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
                      name="bukti_pelaksanaan"
                      id="bukti_pelaksanaan"
                      accept="image/jpeg, image/jpg, image/png"
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
