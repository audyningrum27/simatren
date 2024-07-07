import React, { useEffect, useState, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import axios from 'axios';
import { useAuth } from '../../../AuthContext';
import moment from 'moment-timezone';
import bcrypt from 'bcryptjs';

const ProfilEdit = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [profil, setProfil] = useState({
    nama_pegawai: '',
    email: '',
    password: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    no_telp: '',
    role: '',
    status_bpjs: '',
    status_kawin: '',
    anggota_keluarga: '',
    jumlah_tanggungan: '',
    foto_profil: ''
  });
  const { userType } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalPassword, setOriginalPassword] = useState('');

  const fetchProfil = async () => {
    try {
      const token = localStorage.getItem('token');
      const id_pegawai = localStorage.getItem('id_pegawai');
      if (!id_pegawai) {
        console.error('id_pegawai is undefined');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/data_pegawai/pegawai/profil/${id_pegawai}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data.tanggal_lahir) {
        data.tanggal_lahir = moment.tz(data.tanggal_lahir, 'Asia/Jakarta').format('YYYY-MM-DD');
      }

      setProfil(data);
      setOriginalPassword(data.password);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfil();
  }, []);

  const handleEditClick = () => {
    if (isEditable) {
      updateProfil();
    }
    setIsEditable(!isEditable);
  };

  const updateProfil = async () => {
    try {
      const token = localStorage.getItem('token');
      let hashedPassword = originalPassword;

      if (profil.password && profil.password !== originalPassword) {
        hashedPassword = await bcrypt.hash(profil.password, 10);
      }

      const formData = new FormData();
      formData.append('nama_pegawai', profil.nama_pegawai);
      formData.append('nip', profil.nip);
      formData.append('tempat_lahir', profil.tempat_lahir);
      formData.append('tanggal_lahir', moment(profil.tanggal_lahir).format('YYYY-MM-DD'));
      formData.append('jenis_kelamin', profil.jenis_kelamin);
      formData.append('alamat', profil.alamat);
      formData.append('no_telp', profil.no_telp);
      formData.append('email', profil.email);
      formData.append('password', hashedPassword);
      formData.append('role', profil.role);
      formData.append('status_bpjs', profil.status_bpjs);
      formData.append('status_kepegawaian', profil.status_kepegawaian);
      formData.append('anggota_keluarga', profil.anggota_keluarga);
      formData.append('jumlah_tanggungan', profil.jumlah_tanggungan);
      if (selectedFile) {
        formData.append('foto_profil', selectedFile);
      }

      const response = await axios.put(
        `http://localhost:5000/api/data_pegawai/pegawai/profil/${profil.id_pegawai}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setShowPopupEdit(true);
      setTimeout(() => setShowPopupEdit(false), 2000);

      if (response.data && response.data.foto_profil) {
        setProfil(prevProfil => ({
          ...prevProfil,
          foto_profil: {
            data: response.data.foto_profil.data,
            type: response.data.foto_profil.type
          }
        }));
      }
      setSelectedFile(null); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (showPopupEdit) {
      const timer = setTimeout(() => {
        setShowPopupEdit(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPopupEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil((prevProfil) => ({
      ...prevProfil,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file && fileTypes.includes(file.type)) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfil((prevProfil) => ({
          ...prevProfil,
          foto_profil: {
            data: reader.result.split(',')[1],
            type: file.type.split('/')[1]
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Format file tidak didukung. Silakan unggah file dengan format jpg, jpeg, atau png.');
    }
  };


  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
        <p className="text-xl font-bold mb-4 px-5">Profil</p>

        <div className="absolute right-4">
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
          <div className="flex flex-row py-3 px-5 pt-2 border-t border-white">
            {/* Upload Foto Profil */}
            <div className="relative flex flex-col justify-center items-center border border-gray-400 rounded-full w-24 h-24">
              {profil.foto_profil ? (
                <img
                  src={`data:image/${profil.foto_profil.type};base64,${profil.foto_profil.data}`}
                  alt="Foto Profil"
                  className="border border-gray-400 rounded-full w-24 h-24"
                />
              ) : (
                <FaUserCircle className="text-8xl text-gray-400" />
              )}
              {isEditable && (
                <FaCirclePlus
                  className="absolute bottom-0 right-0 text-2xl text-green-900 mb-3 mr-1 transform translate-x-2 translate-y-2 cursor-pointer"
                  onClick={handleIconClick}
                />
              )}
              <input
                type="file"
                id="foto_profil"
                name="foto_profil"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={!isEditable}
                ref={fileInputRef}
              />
            </div>
          </div>
          <div className="py-7">
            <p className="text-xl font-bold">{profil.nama_pegawai || 'S!MATREN'}</p>
            <p className="text-md font-thin">NIP. {profil.nip}</p>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="flex px-6 pt-4 text-xs font-thin">INFORMASI PRIBADI</h1>
          <table className='w-full border-separate px-10 py-3 text-gray-950 text-sm'>
            <tbody>
              <tr>
                <td>Nama Lengkap</td>
                <td className="p-2">:</td>
                <td className="px-2 border border-gray-400 rounded-md">
                  <input
                    type="text"
                    name="nama_pegawai"
                    value={profil.nama_pegawai}
                    readOnly={!isEditable}
                    onChange={handleChange}
                    className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td className="p-2">:</td>
                <td className="px-2 border border-gray-400 rounded-md">
                  <input
                    type="email"
                    name="email"
                    value={profil.email}
                    readOnly={!isEditable}
                    onChange={handleChange}
                    className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td className="p-2">:</td>
                <td className="px-2 border border-gray-400 rounded-md">
                  <input
                    type="password"
                    name="password"
                    value={profil.password}
                    readOnly={!isEditable}
                    onChange={handleChange}
                    className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                  />
                </td>
              </tr>
              <tr>
                <td>Tempat, Tanggal Lahir</td>
                <td className="p-2">:</td>
                <td className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      name="tempat_lahir"
                      value={profil.tempat_lahir}
                      readOnly={!isEditable}
                      onChange={handleChange}
                      className={`w-full border border-gray-400 rounded-md px-2 py-2 bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                    />
                  </div>
                  <div className="flex-none w-1/3">
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={profil.tanggal_lahir}
                      readOnly={!isEditable}
                      onChange={handleChange}
                      className={`w-full border border-gray-400 rounded-md px-2 py-2 bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td className="p-2">:</td>
                <td className="px-2 border border-gray-400 rounded-md">
                  <input
                    type="text"
                    name="alamat"
                    value={profil.alamat}
                    readOnly={!isEditable}
                    onChange={handleChange}
                    className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                  />
                </td>
              </tr>
              <tr>
                <td>Nomor Telepon</td>
                <td className="p-2">:</td>
                <td className="px-2 border border-gray-400 rounded-md">
                  <input
                    type="text"
                    name="no_telp"
                    value={profil.no_telp}
                    readOnly={!isEditable}
                    onChange={handleChange}
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
                    value={profil.role}
                    readOnly={!isEditable}
                    className='w-full border-none bg-transparent focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td>Status BPJS</td>
                <td className="p-2">:</td>
                <td className="px-1 border border-gray-400 rounded-md">
                  <select
                    name="status_bpjs"
                    value={profil.status_bpjs}
                    disabled={!isEditable}
                    onChange={handleChange}
                    className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Status Perkawinan</td>
                <td className="p-2">:</td>
                <td className="px-1 border border-gray-400 rounded-md">
                  <select
                    name="status_kawin"
                    value={profil.status_kawin}
                    disabled={!isEditable}
                    onChange={handleChange}
                    className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                  >
                    <option value="Menikah">Menikah</option>
                    <option value="Belum Menikah">Belum Menikah</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Data Anggota Keluarga</td>
                <td className="p-2">:</td>
                <td className="px-2 border border-gray-400 rounded-md">
                  <input
                    type="text"
                    name="anggota_keluarga"
                    value={profil.anggota_keluarga}
                    readOnly={!isEditable}
                    onChange={handleChange}
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
                    value={profil.jumlah_tanggungan}
                    readOnly={!isEditable}
                    onChange={handleChange}
                    className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {showPopupEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white font-semibold text-green-900 px-12 py-5 rounded-md shadow-lg">
              <p>Data berhasil diperbarui.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfilEdit;
