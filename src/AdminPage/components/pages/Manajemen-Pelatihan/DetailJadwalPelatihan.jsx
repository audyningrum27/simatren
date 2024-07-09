import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPegawaiStatus } from "../../utils/status";
import moment from 'moment-timezone';

const DetailJadwalPelatihan = () => {
  const navigate = useNavigate();
  const { id_pelatihan } = useParams();
  const [pelatihan, setDataPelatihan] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);

  useEffect(() => {
    fetchDetailPelatihan();
  }, [id_pelatihan]);

  const fetchDetailPelatihan = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/data_pelatihan/pelatihan/${id_pelatihan}`);
      const data = await response.json();
      const formattedData = {
        ...data,
        tanggal_mulai: moment.utc(data.tanggal_mulai).tz('Asia/Jakarta').format('YYYY-MM-DD'),
        tanggal_selesai: moment.utc(data.tanggal_selesai).tz('Asia/Jakarta').format('YYYY-MM-DD'),
      };
      setDataPelatihan(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = async () => {
    if (isEditable) {
      try {
        const updatedPelatihan = { ...pelatihan };
        if (pelatihan.tanggal_mulai) {
          updatedPelatihan.tanggal_mulai = moment(pelatihan.tanggal_mulai, 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
        if (pelatihan.tanggal_selesai) {
          updatedPelatihan.tanggal_selesai = moment(pelatihan.tanggal_selesai, 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
        console.log('Updating pelatihan:', updatedPelatihan);

        const response = await fetch(`http://localhost:5000/api/data_pelatihan/pelatihan/${id_pelatihan}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPelatihan),
        });
        const data = await response.json();
        if (response.ok) {
          setShowPopupEdit(true);
          setTimeout(() => {
            navigate('/AdminPage/jadwal_pelatihan');
          }, 2000);
        } else {
          console.error('Error updating data:', data.error);
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (showPopupEdit) {
      const timer = setTimeout(() => {
        setShowPopupEdit(false);
        navigate('/AdminPage/jadwal_pelatihan');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopupEdit, navigate]);

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/data_pelatihan/pelatihan/${id_pelatihan}`, {
        method: 'DELETE',
      });
      setShowPopup(true);
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/AdminPage/jadwal_pelatihan');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPelatihan((prevPelatihan) => ({ ...prevPelatihan, [name]: value }));
  };

  if (!pelatihan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Detail Jadwal Pelatihan</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
        <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                <tbody>
                  <tr>
                    <td>Nomor Induk Pegawai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="number"
                        name="nip"
                        value={pelatihan.nip}
                        readOnly={!isEditable}
                        className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Pegawai</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="nama_pegawai"
                        value={pelatihan.nama_pegawai}
                        readOnly={!isEditable}
                        className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Penyelenggara</td>
                    <td className="p-2">:</td>
                    <td className="px-2 border border-gray-400 rounded-md">
                      <input
                        type="text"
                        name="nama_penyelenggara"
                        value={pelatihan.nama_penyelenggara}
                        readOnly={!isEditable}
                        onChange={handleChange}
                        className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
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
                        readOnly={!isEditable}
                        onChange={handleChange}
                        className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
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
                        value={pelatihan.tanggal_mulai}
                        readOnly={!isEditable}
                        onChange={handleChange}
                        className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
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
                        value={pelatihan.tanggal_selesai}
                        readOnly={!isEditable}
                        onChange={handleChange}
                        className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
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
                        readOnly={!isEditable}
                        onChange={handleChange}
                        className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className="p-2">:</td>
                    <td>{getPegawaiStatus(pelatihan.status)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tombol Konfirmasi */}
          <div className="flex flex-row gap-6 justify-end px-5 md:w-[100%] w-[90%] mx-auto mb-5">
            <button
              type="button"
              onClick={handleEditClick}
              className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isEditable ? 'Simpan' : 'Edit'}
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="w-28 text-black bg-red-500 hover:bg-red-700 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Hapus
            </button>
          </div>
        </div>

        {isDeleting && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg text-sm">
              <p className="mb-4">Apakah Anda yakin ingin menghapus data ini?</p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="mr-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
              <p>Data pelatihan berhasil dihapus.</p>
            </div>
          </div>
        )}

        {showPopupEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
              <p>Data pelatihan berhasil diperbarui.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DetailJadwalPelatihan;