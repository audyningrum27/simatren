import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { formatDate } from '../../utils/formatDate';
import { GoDownload } from "react-icons/go";

const PengajuanCuti = () => {
  const navigate = useNavigate();
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [buktiFormIzin, setBuktiFormIzin] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const idPegawai = localStorage.getItem('id_pegawai');
  const today = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id_pegawai', idPegawai);
    formData.append('tanggalMulai', tanggalMulai);
    formData.append('tanggalSelesai', tanggalSelesai);
    formData.append('bukti_form_izin', buktiFormIzin);

    try {
      const response = await axios.post('https://backend.simatren.space/api/data_cuti/cuti', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        // Ambil nama pegawai
        const { data: pegawai } = await axios.get(`https://backend.simatren.space/api/data_pegawai/pegawai/profil/${idPegawai}`);
        const namaPegawai = pegawai.nama_pegawai;

        // Format Tanggal
        const formatTanggalMulai = formatDate(tanggalMulai);
        const formatTanggalSelesai = formatDate(tanggalSelesai);

        await axios.post('https://backend.simatren.space/api/data_notifikasi/notifikasi-admin/cuti', {
          id_pegawai: idPegawai,
          message: `${namaPegawai} melakukan pengajuan cuti dari ${formatTanggalMulai} hingga ${formatTanggalSelesai}.`
        });

        console.log('Pengajuan Cuti Berhasil');
        setTanggalMulai('');
        setTanggalSelesai('');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error submitting cuti:', error);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
        const response = await axios.get('https://backend.simatren.space/api/data_cuti/download-template-cuti', {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'form_izin_template.docx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading template:', error);
        alert('Failed to download template.');
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

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">

          {/* Button Download Template */}
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="flex flex-row w-fit text-black bg-gray-100 border border-gray-400 focus:outline-none rounded-md text-sm px-1.5 py-1.5 text-center"
            >
              Download Form Izin
              <GoDownload fontSize={18} className='ml-1'/>
            </button>
          </div>

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
                      className={`bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${tanggalSelesai ? 'text-black' : 'text-gray-400'}`}
                      placeholder="Masukkan Tanggal Mulai Cuti"
                      min={tanggalMulai ? tanggalMulai : today}
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
                  <td className="p-2 text-sm">Bukti Form Izin<span className="text-red-600">*</span></td>
                  <td className="p-2">:</td>
                  <td className="p-2">
                    <input
                      type="file"
                      name="bukti_form_izin"
                      id="bukti_form_izin"
                      accept=".jpeg, .jpg, .png, .pdf"
                      onChange={(e) => setBuktiFormIzin(e.target.files[0])}
                      className="bg-gray-50 border-[1.5px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
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
          className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
  );
};

export default PengajuanCuti;