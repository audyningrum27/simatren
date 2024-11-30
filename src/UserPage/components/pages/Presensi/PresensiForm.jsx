import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PresensiForm = () => {
  const { id_presensi } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hafalan: '',
    amalan_baik: '',
    kegiatan_rutin: '',
    penyelesaian_masalah: '',
    inisiatif_proyek: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://backend.simatren.space/api/data_presensi/update-presensi/${id_presensi}`, formData);
      console.log(response.data.message);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/UserPage/historipresensi');
      }, 2000);
    } catch (error) {
      console.error('Error updating presensi:', error);
    }
  };

  return (
    <div className="p-5">
      <p className="text-xl font-bold mb-4">Pelaporan Keaktifan Pegawai</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hafalan" className="block font-semibold mb-1">
            <p>Apa surah atau ayat Al-Qur'an yang baru Anda hafal atau baca hari ini?</p>
          </label>
          <input
            type="text"
            id="hafalan"
            name="hafalan"
            value={formData.hafalan}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="amalan_baik" className="block font-semibold mb-1">
            <p>Sebutkan satu amalan kebaikan yang Anda lakukan hari ini dan bagaimana dampaknya terhadap lingkungan pesantren?</p>
          </label>
          <input
            type="text"
            id="amalan_baik"
            name="amalan_baik"
            value={formData.amalan_baik}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="kegiatan_rutin" className="block font-semibold mb-1">
            <p>Apa kegiatan rutin yang Anda lakukan untuk mendukung pengajaran dan pembelajaran di pesantren?</p>
          </label>
          <input
            type="text"
            id="kegiatan_rutin"
            name="kegiatan_rutin"
            value={formData.kegiatan_rutin}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="penyelesaian_masalah" className="block font-semibold mb-1">
            <p>Bagaimana cara Anda menyelesaikan masalah yang dihadapi dalam tugas sehari-hari di pesantren?</p>
          </label>
          <input
            type="text"
            id="penyelesaian_masalah"
            name="penyelesaian_masalah"
            value={formData.penyelesaian_masalah}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="inisiatif_proyek" className="block font-semibold mb-1">
            <p>Sebutkan satu inisiatif atau proyek yang Anda usulkan untuk meningkatkan kehidupan komunitas pesantren</p>
          </label>
          <input
            type="text"
            id="inisiatif_proyek"
            name="inisiatif_proyek"
            value={formData.inisiatif_proyek}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-900 text-white font-semibold rounded"
        >
          Kirim
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white font-semibold text-green-900 px-12 py-5 rounded-md shadow-lg">
            <p>Pelaporan Keaktifan Berhasil Dikirim</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresensiForm;