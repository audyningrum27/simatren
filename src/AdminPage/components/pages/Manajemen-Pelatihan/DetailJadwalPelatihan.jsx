import { getPegawaiStatus } from "../../utils/status";

const detailPegawai = [
  {
    id: '1',
    nama_kegiatan: 'Pelatihan Mengajar',
    tgl_mulai: '2024-05-21T05:24:00',
    tgl_selesai: '2024-05-22T05:24:00',
    deskrisi_kegiatan: 'Lorem Ipsum is simply dummy text.',
    status: 'SELESAI',
  }
]

const DetailJadwalPelatihan = () => {
  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Detail Jadwal Pelatihan</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
        <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                <tbody>
                  {detailPegawai.map((pelatihan) => (
                  <tr key={pelatihan.id}>
                    <td>Nama Kegiatan</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.nama_kegiatan}</td>
                  </tr>
                  ))}                  
                  {detailPegawai.map((pelatihan) => (
                  <tr key={pelatihan.id}>
                    <td>Tanggal Mulai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{new Date(pelatihan.tgl_mulai).toLocaleDateString()}</td>
                  </tr>
                  ))}
                  {detailPegawai.map((pelatihan) => (
                  <tr key={pelatihan.id}>
                    <td>Tanggal Selesai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{new Date(pelatihan.tgl_selesai).toLocaleDateString()}</td>
                  </tr>
                  ))}
                  {detailPegawai.map((pelatihan) => (
                  <tr key={pelatihan.id}>
                    <td>Deskripsi Kegiatan</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">{pelatihan.deskrisi_kegiatan}</td>
                  </tr>
                  ))}
                  {detailPegawai.map((pelatihan) => (
                  <tr key={pelatihan.id}>
                    <td>Status</td>
                    <td className="p-2">:</td>
                    <td>{getPegawaiStatus(pelatihan.status)}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailJadwalPelatihan;
