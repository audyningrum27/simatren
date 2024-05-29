// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { getStatus } from '../../utils/status';
import { useNavigate } from 'react-router-dom';

const dataPelatihan = [
  {
    id: '1',
    nomor: '1',
    nama_kegiatan: 'Pelatihan Komputer',
    tanggal_mulai: '2024-05-14T05:24:00',
    tanggal_selesai: '2024-05-14T05:24:00',
    action: 'KONFIRMASI'
  },
];

function JadwalPelatihanUser() {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleConfirm = (id) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedId(null);
  };

  const handleYes = () => {
    // Handle the confirmation action here, e.g., update the status in the data
    console.log(`Confirmed action for id: ${selectedId}`);
    handleClosePopup();
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate('/UserPage/histori_pelatihan');
    }, 2000);
  };

  return (
    <div>
      <p className="text-xl font-bold px-5">Jadwal Pelatihan</p>

      <div className="relative py-4 w-full justify-between flex flex-row">
        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 pr-4 rounded-sm"
        />
      </div>

      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
        <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Nama Kegiatan</td>
                <td className='font-bold py-4'>Tanggal Mulai</td>
                <td className='font-bold py-4'>Tanggal Selesai</td>
                <td className='font-bold py-4'>Action</td>
              </tr>
            </thead>

            <tbody>
              {dataPelatihan.map((pelatihan) => (
                <tr key={pelatihan.id}>
                  <td className="p-1 pt-2">{pelatihan.nomor}</td>
                  <td className="p-1 pt-2">{pelatihan.nama_kegiatan}</td>
                  <td>{new Date(pelatihan.tanggal_mulai).toLocaleDateString()}</td>
                  <td>{new Date(pelatihan.tanggal_selesai).toLocaleDateString()}</td>
                  <td>{getStatus(pelatihan.action, handleConfirm, pelatihan.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p>Apakah Anda yakin ingin mengonfirmasi?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleClosePopup}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md mr-2"
              >
                Tidak
              </button>
              <button
                onClick={handleYes}
                className="bg-green-900 text-white py-2 px-4 rounded-md"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-green-900 p-6 rounded-md shadow-md font-semibold">
            <p>Konfirmasi pelatihan berhasil!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default JadwalPelatihanUser;