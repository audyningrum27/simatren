import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function ManajemenPresensi() {
  const [dataPresensi, setDataPresensi] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDataPresensi();
  }, []);

  const fetchDataPresensi = async () => {
    try {
      const response = await fetch('https://be-simatren.riset-d3rpla.com/api/data_presensi/presensi');
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPresensi = dataPresensi.filter((data) => {
    const dateMatches = moment(data.tanggal_presensi, 'DD/MM/YYYY').isSame(selectedDate, 'day');
    const searchMatches = data.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase()) || data.nip.toLowerCase().includes(searchTerm.toLowerCase());
    return dateMatches && searchMatches;
  });

  const totalPages = Math.ceil(filteredPresensi.length / itemsPerPage);
  const currentPageData = filteredPresensi.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  return (
    <div>
      <p className="text-xl font-bold px-5">Manajemen Presensi</p>

      <div className="w-36 pt-5 py-3">
        <div className="text-sm rounded-sm border border-gray-400 flex justify-between items-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMM yyyy"
            customInput={<CustomInput />}
          />
        </div>
      </div>

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
                  <td className='font-bold py-4'>Nama Pegawai</td>
                  <td className='font-bold py-4'>Tanggal</td>
                  <td className='font-bold py-4'>Jam Masuk</td>
                  <td className='font-bold py-4'>Jam Keluar</td>
                  <td className='font-bold py-4'>Total Jam Kerja</td>
                  <td className='font-bold py-4'>Laporan Kinerja</td>
                </tr>
              </thead>

              <tbody>
                {currentPageData.length === 0 && (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        Tidak ada Presensi untuk ditampilkan.
                      </td>
                    </tr>
                  )}
                {currentPageData.map((data, index) => (
            <tr key={index}>
              <td className="p-1 pt-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{data.nip}</td>
              <td>{data.nama_pegawai}</td>
              <td>{data.tanggal_presensi}</td>
              <td>{data.jam_masuk}</td>
              <td className={data.jam_keluar ? '' : 'text-red-700'}>
                {data.jam_keluar ? data.jam_keluar : '(Belum Scan)'}
              </td>
              <td>{data.total_jam_kerja !== null ? `${data.total_jam_kerja}` : '-'}</td>
              <td className='font-semibold'>
                {data.jam_masuk ? (
                  data.hafalan ? (
                    <button
                      onClick={() => navigate(`/AdminPage/laporan_kinerja/${data.id_presensi}`)}
                      className='flex justify-start items-center'>
                      Sudah Mengisi
                      <HiChevronRight fontSize={18} className='ml-1' />
                    </button>
                  ) : (
                    <span>Belum Mengisi</span>
                  )
                ) : (
                  <span>-</span>
                )}
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
    </div>
  );
}

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="text-sm flex-grow flex items-center justify-between px-2 py-1"
    onClick={onClick}
    ref={ref}
  >
    <span>{value || "Select Date"}</span>
    <MdOutlineCalendarMonth className="ml-2" />
  </button>
));

export default ManajemenPresensi;