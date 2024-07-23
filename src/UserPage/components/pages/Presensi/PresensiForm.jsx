import React, { useState } from 'react';
import axios from 'axios';

const PresensiForm = ({ id_presensi }) => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/data_presensi/presensi/form/${id_presensi}`, {
        gform_kinerja: formData,
      });
      console.log('Form submitted:', response.data);
      // Optionally, navigate or show success message here
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-5">
      <p className="text-xl font-bold mb-4">Pelaporan Keaktifan Pegawai</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question1" className="block font-semibold mb-1">
            <p>Apa surah atau ayat Al-Qur'an yang baru Anda hafal atau ulangi dalam hari ini?</p>
          </label>
          <input
            type="text"
            id="question1"
            name="question1"
            value={formData.question1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div>
          <label htmlFor="question2" className="block font-semibold mb-1">
           <p>Sebutkan satu amalan kebaikan yang Anda lakukan dalam hari ini dan bagaimana dampaknya terhadap lingkungan pesantren?</p>
          </label>
          <input
            type="text"
            id="question2"
            name="question2"
            value={formData.question2}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="question3" className="block font-semibold mb-1">
            <p>Apa kegiatan rutin yang Anda lakukan untuk mendukung pengajaran dan pembelajaran di pesantren?</p>
          </label>
          <input
            type="text"
            id="question3"
            name="question3"
            value={formData.question3}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="question4" className="block font-semibold mb-1">
            <p>Bagaimana cara Anda menyelesaikan tantangan atau masalah yang dihadapi dalam tugas sehari-hari di pesantren?</p>
          </label>
          <input
            type="text"
            id="question4"
            name="question4"
            value={formData.question4}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="question5" className="block font-semibold mb-1">
            <p>Sebutkan satu inisiatif atau proyek yang telah Anda laksanakan atau usulkan untuk meningkatkan kehidupan komunitas pesantren</p>
          </label>
          <input
            type="text"
            id="question5"
            name="question5"
            value={formData.question5}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-900 text-white font-semibold rounded"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default PresensiForm;