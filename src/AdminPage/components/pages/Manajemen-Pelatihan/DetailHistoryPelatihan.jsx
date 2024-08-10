import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPegawaiStatus } from "../../utils/status";
import moment from 'moment-timezone';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import axios from 'axios';

const DetailHistoryPelatihan = () => {
  const { id_pelatihan } = useParams();
  const navigate = useNavigate();
  const [pelatihan, setDataPelatihan] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchDetailPelatihan();
  }, [id_pelatihan]);

  const fetchDetailPelatihan = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/data_pelatihan/pelatihan/${id_pelatihan}`);
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
    updateStatusPelatihan(id_pelatihan, 'Selesai');
  };

  const handleButtonNo = (id_pelatihan) => {
    updateStatusPelatihan(id_pelatihan, 'Ditolak');
  };

  const updateStatusPelatihan = async (id_pelatihan, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/data_pelatihan/pelatihan/status/${id_pelatihan}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      // Menambahkan notifikasi
      const message = `Pelaporan pelatihan Anda telah ${status === 'Selesai' ? 'disetujui' : 'ditolak'}.`;
      await axios.post('http://localhost:5000/api/data_notifikasi/notifikasi-pegawai/accpelatihan', {
        id_pegawai: pelatihan.id_pegawai,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/AdminPage/histori_pelatihan');
      }, 2000);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!pelatihan) {
    return <div>Loading...</div>;
  }

  const viewBrosurPelatihan = (id_pelatihan) => {
    const url = `http://localhost:5000/api/data_pelatihan/pelatihan/view-brosur/${id_pelatihan}`;
    window.open(url, '_blank');
  };

  const viewBuktiPelaksanaan = () => {
    const url = `http://localhost:5000/api/data_pelatihan/pelatihan/view-bukti/${id_pelatihan}`;
    window.open(url, '_blank');
  };

  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Detail Histori Pelatihan</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
        <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                <tbody>
                  <tr>
                    <td>Nomor Induk Pegawai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="number"
                        name="nip"
                        value={pelatihan.nip}
                        className="w-full border-none bg-transparent focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Pegawai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="nama_pegawai"
                        value={pelatihan.nama_pegawai}
                        className="w-full border-none bg-transparent focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Penyelenggara</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="nama_penyelenggara"
                        value={pelatihan.nama_penyelenggara}
                        className="w-full border-none bg-transparent focus:outline-none"
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
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Mulai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="date"
                        name="tanggal_mulai"
                        value={moment(pelatihan.tanggal_mulai, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                        className="w-full border-none bg-transparent focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Selesai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="date"
                        name="tanggal_selesai"
                        value={moment(pelatihan.tanggal_selesai, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                        className="w-full border-none bg-transparent focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Deskripsi Kegiatan</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <textarea
                        name="deskripsi_kegiatan"
                        value={pelatihan.deskripsi_kegiatan}
                        className="w-full border-none bg-transparent focus:outline-none resize-none"
                        rows="4"
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
                  <tr>
                    <td>Status</td>
                    <td className="p-2">:</td>
                    <td>{getPegawaiStatus(pelatihan.status)}</td>
                  </tr>
                  <tr>
                    <td>Bukti Pelaksanaan</td>
                    <td className="p-2">:</td>
                    <td className='font-semibold text-xs'>
                      {pelatihan.bukti_pelaksanaan ? (
                        <button
                          className='flex justify-start items-center bg-green-500 px-3 py-1 rounded-sm'
                          onClick={viewBuktiPelaksanaan}
                        >
                          <MdOutlineRemoveRedEye fontSize={16} className='mr-1' />
                          Lihat
                        </button>
                      ) : (
                        <div>
                          <button
                            className='flex justify-start items-center bg-gray-300 text-gray-700 px-3 py-1 rounded-sm'
                            disabled
                          >
                            <PiEmptyBold fontSize={18} className='mr-1' />
                            Belum ada data
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
          {pelatihan.status === 'Belum Acc' && (
            <div className="flex justify-end space-x-4 m-5 font-semibold text-xs">
              <button
                className='flex justify-start items-center bg-green-500 px-4 py-2 rounded-md'
                onClick={() => handleButtonYes(pelatihan.id_pelatihan)}
              >
                Setujui
              </button>
              <button
                className='flex justify-start items-center bg-red-500 px-4 py-2 rounded-md'
                onClick={() => handleButtonNo(pelatihan.id_pelatihan)}
              >
                Tolak
              </button>
            </div>
          )}

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
                <p>Status pelatihan berhasil diperbarui!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailHistoryPelatihan;