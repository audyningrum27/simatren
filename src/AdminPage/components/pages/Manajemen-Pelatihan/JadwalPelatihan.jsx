import { HiOutlineSearch } from 'react-icons/hi'
import { HiMiniPlus } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";
import { getPegawaiStatus } from '../../utils/status';
import { useNavigate } from 'react-router-dom';


const dataPelatihan = [
  {
      id: '1',
      nomor: '1',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'PROSES',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '2',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'PROSES',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '3',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'PROSES',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '4',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'BELUM DIMULAI',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '5',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'BELUM DIMULAIDIMULAI',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '6',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'BELUM DIAMBIL',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '7',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'BELUM DIMULAI',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '8',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'BELUM DIMULAI',
      action: 'Detail'
  },
  {
      id: '1',
      nomor: '9',
      kegiatan: 'Pelatihan Mengajar',
      tanggal: '2024-05-21T05:24:00',
      status: 'BELUM DIMULAI',
      action: 'Detail'
  }
]

function JadwalPelatihan() {
  const navigate = useNavigate()

  return (
    <div>
      <p className="text-xl font-bold px-5">Jadwal Pelatihan</p>
      
      <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-2/3 h-10 pl-11 rounded-sm"
        />
      
        <div className='flex justify-between mx-2 md:mx-10'>
          <HiMiniPlus fontSize={22} className="text-neutral-50 absolute top-1/2 -translate-y-1/2 ml-2" />
          <button onClick={() => navigate('/AdminPage/atur_jadwal_pelatihan')} className="text-xs text-white bg-green-900 rounded-sm h-10 px-10 w-fit">
            Atur Jadwal Pelatihan
          </button>
        </div>
      </div>

      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
        <div className="h-96 md:w-full w-[33rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white"> 
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Nama Kegiatan</td>
                <td className='font-bold py-4'>Tanggal</td>
                <td className='font-bold py-4'>Status</td>
                <td className='font-bold py-4'>Action</td>
              </tr>
            </thead>

            <tbody>
              {dataPelatihan.map((pelatihan) => (
              <tr key={pelatihan.id}>
                <td className="p-1 pt-2">{pelatihan.nomor}</td>
                <td>{pelatihan.kegiatan}</td>
                <td>{new Date(pelatihan.tanggal).toLocaleDateString()}</td>
                <td>{getPegawaiStatus(pelatihan.status)}</td>
                <td className='font-semibold'>
                  <button onClick={() => navigate('/AdminPage/detail_jadwal_pelatihan')} className='flex justify-start items-center'>
                    {pelatihan.action}
                    <HiChevronRight fontSize={18} className='ml-2' />
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className='py-2 justify-end flex flex-row items-center'>
        <button><HiChevronLeft fontSize={18} className='mr-2' /></button>
          <div className='flex gap-4'>
            <BoxWrapper>1</BoxWrapper>
            <BoxWrapper>2</BoxWrapper>
            <BoxWrapper>..</BoxWrapper>
            <BoxWrapper>8</BoxWrapper>
          </div>
        <button><HiChevronRight fontSize={18} className='ml-2' /></button>
      </div> */}

    </div>
  )
}

// eslint-disable-next-line react/prop-types
// function BoxWrapper({ children }) {
//   return <button className="bg-neutral-100 rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold hover:bg-green-900 active:bg-green-900 focus:outline-none focus:bg focus:bg-green-900">{children}</button>
// }

export default JadwalPelatihan
