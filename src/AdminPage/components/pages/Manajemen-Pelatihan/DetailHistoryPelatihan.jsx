import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPegawaiStatus } from "../../utils/status";
import moment from 'moment-timezone';
import { MdImage } from "react-icons/md";

export default function DetailHistoryPelatihan() {
  const { id_historipelatihan } = useParams();
  const [pelatihan, setPelatihan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/histori_pelatihan/historipelatihan/${id_historipelatihan}`);
        const data = await response.json();
        const formattedData = {
          ...data,
          tanggal_mulai: moment.utc(data.tanggal_mulai).tz('Asia/Jakarta').format('DD/MM/YYYY'),
          tanggal_selesai: moment.utc(data.tanggal_selesai).tz('Asia/Jakarta').format('DD/MM/YYYY'),
        };
        setPelatihan(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id_historipelatihan]);

  if (!pelatihan) {
    return <div>Loading...</div>;
  }

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
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.nip}</td>
                  </tr>
                  <tr>
                    <td>Nama Pegawai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.nama_pegawai}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Mulai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.tanggal_mulai}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Selesai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.tanggal_selesai}</td>
                  </tr>
                  <tr>
                    <td>Nama Penyelenggara</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.nama_penyelenggara}</td>
                  </tr>
                  <tr>
                    <td>Nama Kegiatan</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.nama_kegiatan}</td>
                  </tr>
                  <tr>
                    <td>Deskripsi Kegiatan</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.deskripsi_kegiatan}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className="p-2">:</td>
                    <td>{getPegawaiStatus(pelatihan.status)}</td>
                  </tr>
                  <tr>
                    <td>Bukti Pelaksanaan</td>
                    <td className="p-2">:</td>
                    <td className="flex items-center">
                      <div className="flex space-x-4">
                        {pelatihan.bukti_pelaksanaan ? (
                          <img
                            src={`data:image/${pelatihan.bukti_pelaksanaan.type};base64,${pelatihan.bukti_pelaksanaan.data}`}
                            alt="Bukti Pelaksanaan"
                            className="w-24 h-16 border border-gray-400"
                          />
                        ) : (
                          <div className="w-16 h-16 border border-gray-400 text-gray-400 flex justify-center items-center">
                            <MdImage fontSize={72} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
