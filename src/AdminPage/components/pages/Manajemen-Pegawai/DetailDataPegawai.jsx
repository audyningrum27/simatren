import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { getPegawaiStatus } from "../../utils/status";

const detailPegawai = [
  {
    id: '1',
    nip: '19860926201500',
    nama: 'Shirley A. Lape',
    gender: 'Perempuan',
    ttl: 'Bandung, 23 Mei 2000',
    alamat: 'Jalan Telekomunikasi No.54, Deyeuhkolot',
    no_telp: '0819373627636',
    email: 'user@gmail.com',
    role: 'Guru',
    status_pegawai: 'Aktif',
    status_bpjs: 'Aktif',
    status_perkawinan: 'Sudah Menikah',
    data_keluarga:'Lorem Ipsum, Lorem Ipsum',
    jumlah_tanggungan:'2'
  },
];

export default function DetailDataPegawai() {
  const [isEditable, setIsEditable] = useState(false);
  const [pegawai, setPegawai] = useState(detailPegawai);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);

  const handleEditClick = () => {
    if (isEditable) {
      setShowPopupEdit(true);
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (showPopupEdit) {
      const timer = setTimeout(() => {
        setShowPopupEdit(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopupEdit]);

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const confirmDelete = () => {
      setPegawai([]);
      setShowPopup(true);
      setIsDeleting(false);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const cancelDelete = () => {
      setIsDeleting(false);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setPegawai((prevPegawai) =>
      prevPegawai.map((data) =>
        data.id === id ? { ...data, [name]: value } : data
      )
    );
  };

  return (
    <div className="px-5">
      <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Detail Pegawai</span>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
        <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
          <div className="flex flex-col md:flex-row">
            <div className="box-border relative md:w-1/5 h-56 bg-gray-300 justify-center items-center flex flex-col rounded-sm mx-10 mt-6">
              <FaUserCircle className="text-8xl text-gray-500"/>
              <div>
                {pegawai.map((data) => (
                  <p key={data.id} className="mt-2 text-sm">
                    {data.nama}
                  </p>
                ))}
              </div>
              <div>
                {pegawai.map((data) => (
                  <p key={data.id} className="mt-2 text-sm">
                    {data.nip}
                  </p>
                ))}
              </div>
              <div className="flex flex-row w-56 justify-center mt-5">
                <p className="px-2 text-sm">Status :</p>
                <p>{pegawai.map((data) => getPegawaiStatus(data.status_pegawai))}</p>
              </div>
            </div>

            <div className="flex-1">
              <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                <tbody>
                  {pegawai.map((data) => (
                  <React.Fragment key={data.id}>
                    <tr>
                      <td>Nama Lengkap</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="nama"
                          value={data.nama}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Nomor Induk Pegawai</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="nip"
                          value={data.nip}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                     </td>
                    </tr>
                    <tr>
                      <td>Tempat, Tanggal Lahir</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="ttl"
                          value={data.ttl}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Jenis Kelamin</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="gender"
                          value={data.gender}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="alamat"
                          value={data.alamat}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Nomor Telepon</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="number"
                          name="no_telp"
                          value={data.no_telp}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="email"
                          value={data.email}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Posisi</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="role"
                          value={data.role}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Status BPJS</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="status_bpjs"
                          value={data.status_bpjs}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Status Perkawinan</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="status_perkawinan"
                          value={data.status_perkawinan}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Data Anggota Keluarga</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="text"
                          name="data_keluarga"
                          value={data.data_keluarga}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Jumlah Tanggungan</td>
                      <td className="p-2">:</td>
                      <td className="px-2 border border-gray-400 rounded-md">
                        <input
                          type="number"
                          name="jumlah_tanggungan"
                          value={data.jumlah_tanggungan}
                          readOnly={!isEditable}
                          onChange={(e) => handleChange(e, data.id)}
                          className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                  ))}
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
      </div>

      {/* Modal Konfirmasi */}
      {isDeleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Penghapusan</h2>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Data Pegawai Telah Dihapus</p>
          </div>
        </div>
      )}

      {showPopupEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Data Pegawai Telah Diperbarui</p>
          </div>
        </div>
      )}
    </div>
  );
}
