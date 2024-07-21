import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { getStatus } from '../../utils/status';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";

const DetailPelatihanPegawai = () => {
  const { id_pelatihan } = useParams();
  const [pelatihan, setDataPelatihan] = useState(null);

  useEffect(() => {
    fetchDetailPelatihan();
  }, [id_pelatihan]);

  const fetchDetailPelatihan = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/data_pelatihan/pelatihan/${id_pelatihan}?timestamp=${new Date().getTime()}`);
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

  if (!pelatihan) {
    return <div>Loading...</div>;
  }

  //Menampilkan Bukti Pelaksanaan
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
                      <input
                        type="text"
                        name="deskripsi_kegiatan"
                        value={pelatihan.deskripsi_kegiatan}
                        className="w-full border-none bg-transparent focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className="p-2">:</td>
                    <td>{getStatus(pelatihan.status)}</td>
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
                            className='flex justify-start items-center bg-gray-300 px-2 py-1 text-gray-900'
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
        </div>
      </div>
    </div>
  )
}

export default DetailPelatihanPegawai;