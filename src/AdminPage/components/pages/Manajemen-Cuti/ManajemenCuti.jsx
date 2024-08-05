import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function ManajemenCuti() {
  const navigate = useNavigate();
  const [dataCuti, setDataCuti] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDataCuti();
  }, []);

  const fetchDataCuti = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data_cuti/cuti/all');
      const result = await response.json();

      if (result && Array.isArray(result)) {
        const today = new Date().toISOString().split('T')[0];
        const data = result
          .filter(item => item.status_cuti === 'Proses' && item.tanggal_selesai >= today)
          .map(item => ({
            ...item,
            tanggalMulai: formatDate(item.tanggal_mulai),
            tanggalSelesai: formatDate(item.tanggal_selesai),
          }));
        setDataCuti(data);
      } else {
        console.error('Unexpected response data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCuti = dataCuti.filter((data) =>
    data.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirm = (id_cuti, status_cuti) => {
    setSelectedId(id_cuti);
    setSelectedStatus(status_cuti);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedId(null);
    setSelectedStatus('');
  };

  const handleYes = async () => {
    try {
      // Memperbarui status cuti
      const response = await fetch(`http://localhost:5000/api/data_cuti/cuti/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status_cuti: selectedStatus }),
      });

      if (response.ok) {
        // Menambahkan notifikasi
        const notificationResponse = await fetch('http://localhost:5000/api/data_notifikasi/notifikasi-pegawai/cuti', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_pegawai: dataCuti.find(item => item.id_cuti === selectedId).id_pegawai,
            message: `Cuti Anda dari ${formatDate(dataCuti.find(item => item.id_cuti === selectedId).tanggal_mulai)} sampai ${formatDate(dataCuti.find(item => item.id_cuti === selectedId).tanggal_selesai)} telah diterima.`,
          }),
        });

        if (!notificationResponse.ok) {
          console.error('Gagal menambahkan notifikasi');
        }

        // Mengupdate tampilan dan navigasi
        setDataCuti((prevData) => prevData.filter((cuti) => cuti.id_cuti !== selectedId));
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/AdminPage/histori_cuti_pegawai');
        }, 2000);
      } else {
        console.error('Gagal memperbarui status cuti');
      }
    } catch (error) {
      console.error('Error updating cuti status:', error);
    }
    handleClosePopup();
  };

  const totalPages = Math.ceil(filteredCuti.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCutiData = filteredCuti.slice(startIndex, startIndex + itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const BoxWrapper = ({ children, isActive, onClick }) => (
    <button
      className={`rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold ${isActive ? 'bg-green-900 text-white' : 'hover:bg-green-900'
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const viewBuktiFormIzin = (id_cuti) => {
    const url = `http://localhost:5000/api/data_cuti/cuti/view-bukti/${id_cuti}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <p className="text-xl font-bold px-5">Data Pengajuan Cuti</p>
      <div>
        <div className="relative py-4 w-fit md:w-full justify-between flex flex-row">
          <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-2/3 h-10 pl-11 rounded-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className='flex justify-between mx-2 md:mx-10'>
            <button onClick={() => navigate('/AdminPage/histori_cuti_pegawai')} className="font-semibold text-xs text-white bg-green-900 rounded-sm h-10 px-10 w-fit">
              Histori Cuti
            </button>
          </div>
        </div>

        <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
          <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
            <table className='text-gray-700 min-w-[900px]'>
              <thead className="sticky top-0 bg-white">
                <tr className="border-b-[1.5px]">
                  <td className='font-bold py-4'>No.</td>
                  <td className='font-bold py-4'>NIP</td>
                  <td className='font-bold py-4'>Nama Pegawai</td>
                  <td className='font-bold py-4'>Tanggal Mulai</td>
                  <td className='font-bold py-4'>Tanggal Selesai</td>
                  <td className='font-bold py-4'>Bukti Form Izin</td>
                  <td className='font-bold py-4'>Action</td>
                </tr>
              </thead>

              <tbody>
                {currentCutiData.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      Tidak ada Pengajuan Cuti untuk ditampilkan.
                    </td>
                  </tr>
                )}
                {currentCutiData
                  .filter((data) => data.status_cuti !== 'Diterima' && data.status_cuti !== 'Ditolak')
                  .map((data, index) => (
                    <tr key={index}>
                      <td className="p-1 pt-2">{startIndex + index + 1}</td>
                      <td>{data.nip}</td>
                      <td>{data.nama_pegawai}</td>
                      <td>{data.tanggalMulai}</td>
                      <td>{data.tanggalSelesai}</td>
                      <td className='font-semibold'>
                        <button
                          className='flex justify-start items-center'
                          onClick={() => data.bukti_form_izin && viewBuktiFormIzin(data.id_cuti)}
                          disabled={!data.bukti_form_izin}
                        >
                          {data.bukti_form_izin ? (
                            <span className='text-blue-600 underline'>
                              Lihat bukti
                            </span>
                          ) : (
                            '-'
                          )}
                        </button>
                      </td>
                      <td className='font-semibold text-xs'>
                        <div className='flex flex-row gap-3'>
                          <button
                            onClick={() => handleConfirm(data.id_cuti, 'Diterima')}
                            className='flex justify-start items-center bg-green-400 px-3 py-1 rounded-sm'
                          >
                            Terima
                          </button>
                          <button
                            onClick={() => handleConfirm(data.id_cuti, 'Ditolak')}
                            className='flex justify-start items-center text-red-700 bg-red-300 px-3 py-1 rounded-sm'
                          >
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='py-2 justify-end flex flex-row items-center'>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}><HiChevronLeft fontSize={18} className='mr-2' /></button>
          <div className='flex gap-4'>
            {Array.from({ length: totalPages }, (_, index) => (
              <BoxWrapper
                key={index}
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </BoxWrapper>
            ))}
          </div>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}><HiChevronRight fontSize={18} className='ml-2' /></button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-sm">
            <p>Apakah Anda yakin ingin {selectedStatus === 'Diterima' ? 'menerima' : 'menolak'} cuti ini?</p>
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
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>Status cuti berhasil diperbarui!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManajemenCuti;
