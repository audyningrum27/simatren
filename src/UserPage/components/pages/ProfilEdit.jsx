import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";

const profilPegawai = [
  {
    id: '1',
    nama_lengkap: 'Shirley A. Lape',
    gmail: 'user@gmail.com',
    password: '12345678',
    ttl: 'Bandung, 23 Mei 2000',
    alamat: 'Jalan Telekomunikasi No.54, Deyeuhkolot',
  },
];

const ProfilEdit = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [profil, setProfil] = useState(profilPegawai);

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

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setProfil((prevProfil) =>
      prevProfil.map((data) =>
        data.id === id ? { ...data, [name]: value } : data
      )
    );
  };

  return (
    <div>
      <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
        <p className="text-xl font-bold mb-4 px-5">Profil</p>

        <div className="absolute md:right-0 md:mx-4 mx-auto">
          <button
            type="button"
            onClick={handleEditClick}
            className="w-fit text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isEditable ? 'Simpan' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="box-border rounded-sm border border-gray-300 flex-1 shadow-lg overflow-auto">
        <div className="flex flex-row py-3 px-5 pt-2 border-t border-white">
          <div className="py-1">
            <FaUserCircle className="text-8xl text-gray-400" />
          </div>
          <div className="px-5 py-7">
            <p className="text-xl font-bold">S!MATREN</p>
            <p className="text-md font-thin">NIP. 1737268</p>
          </div>
        </div>

        <div className="flex-1">
        <h1 className="flex px-6 pt-4 text-xs font-thin">INFORMASI PRIBADI</h1>
          <table className='w-full border-separate px-10 py-3 text-gray-950 text-sm'>
            <tbody>
              {profil.map((data) => (
              <React.Fragment key={data.id}>
                <tr>
                  <td>Nama Lengkap</td>
                  <td className="p-2">:</td>
                  <td className="px-2 border border-gray-400 rounded-md">
                    <input
                      type="text"
                      name="nama_lengkap"
                      value={data.nama_lengkap}
                      readOnly={!isEditable}
                      onChange={(e) => handleChange(e, data.id)}
                      className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gmail</td>
                  <td className="p-2">:</td>
                  <td className="px-2 border border-gray-400 rounded-md">
                    <input
                      type="text"
                      name="gmail"
                      value={data.gmail}
                      readOnly={!isEditable}
                      onChange={(e) => handleChange(e, data.id)}
                      className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td className="p-2">:</td>
                  <td className="px-2 border border-gray-400 rounded-md">
                    <input
                      type="text"
                      name="password"
                      value={data.password}
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
              </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProfilEdit;
