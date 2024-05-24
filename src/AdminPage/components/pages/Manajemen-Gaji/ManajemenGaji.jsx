import { HiOutlineSearch } from 'react-icons/hi'
import { HiMiniPlus, HiChevronRight, HiChevronLeft } from "react-icons/hi2";

const dataGajiPegawai = [
  {
      id: '1',
      nomor: '1',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '2',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '3',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '4',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '5',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '6',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '7',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '8',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '9',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  },
  {
      id: '1',
      nomor: '10',
      nip: '19860926201500',
      nama: 'Laela Anggraeni',
      gaji_dasar: 'Rp5000.000',
      tunjangan: 'Rp5000.000',
      potongan: 'Rp500.000',
      pph: '10%',
      total: 'Rp5000.000'
  }, 
]

function ManajemenGaji() {
  return (
    <div>
      <p className="text-xl font-bold px-5">Manajemen Gaji</p>
      
      <div className="relative py-4 w-80 md:w-full  justify-between flex flex-row">
        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
         <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-2/3 h-10 pl-11 rounded-sm"
          />
            <div className='flex justify-between mx-2 md:mx-10'>
              <HiMiniPlus fontSize={22} className="text-neutral-50 absolute top-1/2 -translate-y-1/2 ml-2" />
                <button className="text-xs text-white bg-green-900 rounded-sm h-10 px-10 w-">
                  Tambah Data Gaji
                </button>
              </div>
            </div>

            <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
                <div className="h-96 md:w-full w-[33rem] overflow-auto">
                    <table className='text-gray-700 min-w-[900px]'>
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b-[1.5px]">
                                <td className='font-bold py-4'>No.</td>
                                <td className='font-bold py-4'>NIP</td>
                                <td className='font-bold py-4'>Nama</td>
                                <td className='font-bold py-4'>Gaji Dasar</td>
                                <td className='font-bold py-4'>Tunjangan</td>
                                <td className='font-bold py-4'>Potongan</td>
                                <td className='font-bold py-4'>PPh</td>
                                <td className='font-bold py-4'>Total</td>
                            </tr>
                        </thead>

                        <tbody>
                            {dataGajiPegawai.map((gaji) => (
                                <tr key={gaji.id}>
                                    <td className="p-1 pt-2">{gaji.nomor}</td>
                                    <td>{gaji.nip}</td>
                                    <td>{gaji.nama}</td>
                                    <td>{gaji.gaji_dasar}</td>
                                    <td>{gaji.tunjangan}</td>
                                    <td>{gaji.potongan}</td>
                                    <td className="pr-4">{gaji.pph}</td>
                                    <td>{gaji.total}</td>
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

function BoxWrapper({ children }) {
  return <button className="bg-neutral-100 rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold hover:bg-green-900 active:bg-green-900 focus:outline-none focus:bg focus:bg-green-900">{children}</button>
}

export default ManajemenGaji;
