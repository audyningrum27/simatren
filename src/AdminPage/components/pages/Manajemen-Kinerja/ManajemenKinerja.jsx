// import React, { useEffect, useRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { getPegawaiStatus } from "../../utils/status";
import { HiChevronRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const dataPegawai = [
  {
    id: '1',
    nomor: '1',
    nip: '19860926201500',
    nama: 'Shirley A. Lape',
    gender: 'perempuan',
    role: 'guru',
    status_pegawai: 'Aktif'
  },
  {
    id: '1',
    nomor: '2',
    nip: '19860926201500',
    nama: 'Shirley A. Lape',
    gender: 'perempuan',
    role: 'guru',
    status_pegawai: 'Aktif'
  },
  {
    id: '1',
    nomor: '3',
    nip: '19860926201500',
    nama: 'Shirley A. Lape',
    gender: 'perempuan',
    role: 'guru',
    status_pegawai: 'Aktif'
  },
  {
    id: '1',
    nomor: '4',
    nip: '19860926201500',
    nama: 'Shirley A. Lape',
    gender: 'perempuan',
    role: 'guru',
    status_pegawai: 'Aktif'
  },
  {
    id: '1',
    nomor: '5',
    nip: '19860926201500',
    nama: 'Shirley A. Lape',
    gender: 'perempuan',
    role: 'guru',
    status_pegawai: 'Aktif'
  },
  {
    id: '1',
    nomor: '6',
    nip: '19860926201500',
    nama: 'Shirley A. Lape',
    gender: 'perempuan',
    role: 'guru',
    status_pegawai: 'Aktif'
  },
]

function ManajemenKinerja() {
  const navigate = useNavigate()

  return (
    <div>
      <p className="text-xl font-bold px-5">Manajemen Kinerja</p>

      <div>
        <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
          <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 rounded-sm"
          />
        </div>

        <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
          <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
            <table className='text-gray-700 min-w-[900px]'>
              <thead className="sticky top-0 bg-white">
                <tr className="border-b-[1.5px]">
                  <td className='font-bold py-4 px-4'>No.</td>
                  <td className='font-bold py-4 px-4'>NIP</td>
                  <td className='font-bold py-4 px-4'>Nama</td>
                  <td className='font-bold py-4 px-4'>Gender</td>
                  <td className='font-bold py-4 px-4'>Role</td>
                  <td className='font-bold py-4 px-4'>Status</td>
                  <td className='font-bold py-4 px-4'>Action</td>
                </tr>
              </thead>
              <tbody>
                {dataPegawai.map((data) => (
                  <tr key={data.nomor}>
                    <td className="p-4 pt-2">{data.nomor}</td>
                    <td>{data.nip}</td>
                    <td>{data.nama}</td>
                    <td>{data.gender}</td>
                    <td className='pr-4'>{data.role}</td>
                    <td>{getPegawaiStatus(data.status_pegawai)}</td>
                    <td className='font-semibold'>
                      <button
                        onClick={() => navigate('/AdminPage/grafik_kinerja')}
                        className='flex justify-start items-center'
                      >
                        Grafik Kinerja
                        <HiChevronRight fontSize={18} />
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
    </div>
  )
}

// function BoxWrapper({ children }) {
//   return <button className="bg-neutral-100 rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold hover:bg-green-900 active:bg-green-900 focus:outline-none focus:bg focus:bg-green-900">{children}</button>
// }

export default ManajemenKinerja;