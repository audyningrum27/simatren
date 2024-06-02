import React from "react";
import { getPegawaiStatus } from "../../utils/status";
import { MdImage } from "react-icons/md";

const detailPegawai = [
  {
    id: '1',
    nip: '19860926201500',
    nama: 'Albert Einstein',
    tgl_mulai: '2024-05-21T05:24:00',
    tgl_selesai: '2024-05-22T05:24:00',
    nama_kegiatan: 'Pelatihan Mengajar',
    deskripsi_kegiatan: 'Lorem Ipsum is simply dummy text.',
    status: 'SELESAI',
    bukti: 'Bukti Foto'
  }
]

export default function DetailHistoryPelatihan() {
  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Detail Histori Pelatihan</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
        <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                <tbody>
                  {detailPegawai.map((pelatihan) => (
                    <React.Fragment key={pelatihan.id}>
                      <tr>
                        <td>Nomor Induk Pegawai</td>
                        <td className="p-2">:</td>
                        <td className="px-2 border border-gray-400 rounded-md">{pelatihan.nip}</td>
                      </tr>
                      <tr>
                        <td>Nama Pegawai</td>
                        <td className="p-2">:</td>
                        <td className="px-2 border border-gray-400 rounded-md">{pelatihan.nama}</td>
                      </tr>
                      <tr>
                        <td>Tanggal Mulai</td>
                        <td className="p-2">:</td>
                        <td className="px-2 border border-gray-400 rounded-md">{new Date(pelatihan.tgl_mulai).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td>Tanggal Selesai</td>
                        <td className="p-2">:</td>
                        <td className="px-2 border border-gray-400 rounded-md">{new Date(pelatihan.tgl_selesai).toLocaleDateString()}</td>
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
                            <div className="w-16 h-16 border border-gray-400 text-gray-400 flex justify-center items-center">
                              <MdImage fontSize={72} />
                            </div>
                            <div className="w-16 h-16 border border-gray-400 text-gray-400 flex justify-center items-center">
                              <MdImage fontSize={72} />
                            </div>
                            <div className="w-16 h-16 border border-gray-400 text-gray-400 flex justify-center items-center">
                              <MdImage fontSize={72} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
