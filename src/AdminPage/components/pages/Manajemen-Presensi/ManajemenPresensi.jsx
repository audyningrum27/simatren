import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi'
// import { HiChevronRight } from "react-icons/hi2";

function ManajemenPresensi() {
  const [dataPresensi, setDataPresensi] = useState([]);

  useEffect(() => {
    fetchDataPresensi();
  }, []);

  const fetchDataPresensi = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data_presensi/presensi');
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        tanggal_presensi: moment.utc(item.tanggal_presensi).tz('Asia/Jakarta').format('DD/MM/YYYY'),
      }));
      setDataPresensi(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPresensi = dataPresensi.filter((data) =>
    data.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <p className="text-xl font-bold px-5">Manajemen Presensi</p>

      <div>
        <div className="relative py-4 w-full justify-between flex flex-row">
          <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 pr-4 rounded-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
          <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
            <table className='text-gray-700 min-w-[900px]'>
              <thead className="sticky top-0 bg-white">
                <tr className="border-b-[1.5px]">
                  <td className='font-bold py-4'>No.</td>
                  <td className='font-bold py-4'>NIP</td>
                  <td className='font-bold py-4'>Nama</td>
                  <td className='font-bold py-4'>Tanggal</td>
                  <td className='font-bold py-4'>Jam Masuk</td>
                  <td className='font-bold py-4'>Jam Keluar</td>
                  <td className='font-bold py-4'>Total Jam Kerja</td>
                </tr>
              </thead>

              <tbody>
                {filteredPresensi.map((data, index) => (
                  <tr key={index}>
                    <td className="p-1 pt-2">{index + 1}</td>
                    <td>{data.nip}</td>
                    <td>{data.nama_pegawai}</td>
                    <td>{data.tanggal_presensi}</td>
                    <td>{data.jam_masuk}</td>
                    <td>{data.jam_keluar}</td>
                    <div className='flex-row'>
                      <td>{data.total_jam_kerja}</td>
                      <td>Jam</td>
                    </div>
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

// eslint-disable-next-line react/prop-types
// function BoxWrapper({ children }) {
//     return (
//     <button className="bg-neutral-100 rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold hover:bg-green-900 active:bg-green-900 focus:outline-none focus:bg focus:bg-green-900">{children}</button>
//     )
// }

export default ManajemenPresensi;
