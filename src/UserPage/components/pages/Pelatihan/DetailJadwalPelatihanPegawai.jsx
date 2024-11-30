import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import { IoIosClose } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import axios from 'axios';

const DetailPelatihanPegawai = () => {
  const { id_pelatihan } = useParams();
  const [pelatihan, setDataPelatihan] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupBatal, setShowPopupBatal] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetchDetailPelatihan();
  }, [id_pelatihan]);

  const fetchDetailPelatihan = async () => {
    try {
      const response = await fetch(`https://backend.simatren.space/api/data_pelatihan/pelatihan/${id_pelatihan}`);
      const data = await response.json();
      const formattedData = {
        ...data,
        tanggal_mulai: moment.utc(data.tanggal_mulai).tz('Asia/Jakarta').format('DD/MM/YYYY'),
        tanggal_selesai: moment.utc(data.tanggal_selesai).tz('Asia/Jakarta').format('DD/MM/YYYY'),
      };
      setDataPelatihan(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonYes = (id_pelatihan) => {
    updateStatusPelatihan(id_pelatihan, 'Proses');
    setShowPopup(true);
  };

  const handleButtonNo = (id_pelatihan) => {
    updateStatusPelatihan(id_pelatihan, 'Tidak Diambil');
    setShowPopupBatal(true);
  };

  const updateStatusPelatihan = async (id_pelatihan, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://backend.simatren.space/api/data_pelatihan/pelatihan/status/${id_pelatihan}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setShowPopup(true);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/UserPage/histori_pelatihan_pegawai');
  };

  if (!pelatihan) {
    return <div>Loading...</div>;
  }
  const viewBrosurPelatihan = (id_pelatihan) => {
    const url = `https://backend.simatren.space/api/data_pelatihan/pelatihan/view-brosur/${id_pelatihan}`;
    window.open(url, '_blank');
  };

  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Detail Jadwal Pelatihan</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
        <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                <tbody>
                  <tr>
                    <td>Nama Penyelenggara</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="nama_penyelenggara"
                        value={pelatihan.nama_penyelenggara}
                        className="w-full border-none bg-transparent focus:outline-none"
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Kegiatan</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="nama_kegiatan"
                        value={pelatihan.nama_kegiatan}
                        className="w-full border-none bg-transparent focus:outline-none"
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Mulai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="tanggal_mulai"
                        value={pelatihan.tanggal_mulai}
                        className="w-full border-none bg-transparent focus:outline-none"
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Selesai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="tanggal_selesai"
                        value={pelatihan.tanggal_selesai}
                        className="w-full border-none bg-transparent focus:outline-none"
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Deskripsi Kegiatan</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <textarea
                        type="text"
                        name="deskripsi_kegiatan"
                        rows={3}
                        value={pelatihan.deskripsi_kegiatan}
                        className="w-full border-none bg-transparent focus:outline-none"
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Brosur Pelatihan</td>
                    <td className="p-2">:</td>
                    <td className="font-semibold text-xs">
                      {pelatihan.brosur_pelatihan ? (
                        <button
                          className='flex justify-start items-center bg-green-500 px-3 py-1 rounded-sm'
                          onClick={() => pelatihan.brosur_pelatihan && viewBrosurPelatihan(pelatihan.id_pelatihan)}
                        >
                          <MdOutlineRemoveRedEye fontSize={16} className='mr-1' />
                          Lihat
                        </button>
                      ) : (
                        <div>
                          <button
                            className='flex justify-start items-center bg-gray-300 px-2 py-1 text-gray-900'
                            disabled
                          >
                            <PiEmptyBold fontSize={18} className='mr-1' />
                            Tidak ada
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4 m-10 font-semibold text-xs">
            <button
              className='flex justify-start items-center bg-green-500 px-4 py-2 rounded-md'
              onClick={() => handleButtonYes(pelatihan.id_pelatihan)}
            >
              Ambil
            </button>
            <button
              className='flex justify-start items-center bg-red-500 px-4 py-2 rounded-md'
              onClick={() => handleButtonNo(pelatihan.id_pelatihan)}
            >
              Tidak Ambil
            </button>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="text-green-900 font-medium bg-white p-6 rounded-md shadow-lg text-sm w-96 relative">
              <IoIosClose
                fontSize={24}
                className="absolute top-1 right-1 cursor-pointer text-red-700"
                onClick={handleClosePopup}
              />
              <p>Pelatihan berhasil dikonfirmasi!</p>
              <p>Silahkan untuk melaksanakan pelatihan tersebut dan</p>
              <p>Kirim bukti pelaksanaan setelah pelatihan selesai!</p>
            </div>
          </div>
        )}

        {showPopupBatal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="text-green-900 font-medium bg-white p-6 rounded-md shadow-lg text-sm w-96 relative">
              <IoIosClose
                fontSize={24}
                className="absolute top-1 right-1 cursor-pointer text-red-700"
                onClick={handleClosePopup}
              />
              <p>Pelatihan tidak diambil!</p>
              <p>Hubungi admin untuk perubahan keputusan mendatang!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPelatihanPegawai;