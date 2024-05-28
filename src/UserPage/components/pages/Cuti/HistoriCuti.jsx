import { HiOutlineSearch } from 'react-icons/hi'

const dataCutiPegawai = [
  {
      id: '1',
      nomor: '1',
      tanggal_mulai: '2024-05-14T05:24:00',
      tanggal_selesai: '2024-05-14T05:24:00',
      alasan_cuti: 'Liburan'
  },
  {
    id: '2',
    nomor: '2',
    tanggal_mulai: '2024-05-14T05:24:00',
    tanggal_selesai: '2024-05-14T05:24:00',
    alasan_cuti: 'Liburan'
},
{
  id: '3',
  nomor: '3',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
{
  id: '4',
  nomor: '4',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
{
  id: '5',
  nomor: '5',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
{
  id: '6',
  nomor: '6',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
{
  id: '7',
  nomor: '7',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
{
  id: '8',
  nomor: '8',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
{
  id: '9',
  nomor: '9',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
{
  id: '10',
  nomor: '10',
  tanggal_mulai: '2024-05-14T05:24:00',
  tanggal_selesai: '2024-05-14T05:24:00',
  alasan_cuti: 'Liburan'
},
]

function HistoriCuti() {
  return (
    <div>
      <p className="text-xl font-bold px-5">Histori Cuti</p>
      
      <div className="relative py-4 w-full justify-between flex flex-row">
            <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />              
            <input
              type="text"
              placeholder="Search..."
              className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 pr-4 rounded-sm"
            />
          </div>

      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center">
        <div className="h-96 md:w-full w-[34rem] max[500px]:w-[24rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white"> 
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Tanggal Mulai</td>
                <td className='font-bold py-4'>Tanggal Selesai</td>
                <td className='font-bold py-4'>Alasan</td>
              </tr>
            </thead>

            <tbody>
              {dataCutiPegawai.map((cuti) => (
                <tr key={cuti.id}>
                  <td className="p-1 pt-2">{cuti.nomor}</td>
                  <td>{new Date(cuti.tanggal_mulai).toLocaleDateString()}</td>
                  <td>{new Date(cuti.tanggal_selesai).toLocaleDateString()}</td>
                  <td>{cuti.alasan_cuti}</td>
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

// function BoxWrapper({ children }) {
//   return <button className="bg-neutral-100 rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold hover:bg-green-900 active:bg-green-900 focus:outline-none focus:bg focus:bg-green-900">{children}</button>
// }

export default HistoriCuti;
