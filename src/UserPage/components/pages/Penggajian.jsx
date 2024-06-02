import { HiOutlineSearch } from 'react-icons/hi';
import { IoDownloadOutline } from "react-icons/io5";
import { getStatus } from "../utils/status";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const dataGaji = [
  {
    id: '1',
    nomor: '1',
    bulan: 'Agustus',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '2',
    nomor: '2',
    bulan: 'September',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '3',
    nomor: '3',
    bulan: 'Oktober',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '4',
    nomor: '4',
    bulan: 'November',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '5',
    nomor: '5',
    bulan: 'Desember',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '6',
    nomor: '6',
    bulan: 'Januari',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '7',
    nomor: '7',
    bulan: 'Februari',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '8',
    nomor: '8',
    bulan: 'Maret',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '9',
    nomor: '9',
    bulan: 'April',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  },
  {
    id: '10',
    nomor: '10',
    bulan: 'Mei',
    gaji: 'Rp 5.000.000',
    tunjangan: 'Rp 5.000.000',
    potongan: 'Rp 5.000.000',
    total: 'Rp 5.000.000',
    status_gaji: 'Lunas',
    action: 'Download Slip'
  }
];

function Penggajian() {
  const downloadPDF = (id) => {
    const rowData = dataGaji.find(row => row.id === id);
    if (!rowData) return;

    const doc = new jsPDF();
    doc.text(`Slip Gaji - ${rowData.bulan}`, 14, 16);

    const tableColumn = ["No.", "Bulan", "Gaji", "Tunjangan", "Potongan", "Total", "Status"];
    const tableRows = [
      [
        rowData.nomor,
        rowData.bulan,
        rowData.gaji,
        rowData.tunjangan,
        rowData.potongan,
        rowData.total,
        rowData.status_gaji
      ]
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`Data Gaji_${rowData.id}.pdf`);
  };

  return (
    <div>
      <p className="text-xl font-bold px-5">Data Gaji</p>

      <div>
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
                  <td className='font-bold py-4'>Bulan</td>
                  <td className='font-bold py-4'>Gaji</td>
                  <td className='font-bold py-4'>Tunjangan</td>
                  <td className='font-bold py-4'>Potongan</td>
                  <td className='font-bold py-4'>Total</td>
                  <td className='font-bold py-4'>Status</td>
                  <td className='font-bold py-4'>Action</td>
                </tr>
              </thead>
              <tbody>
                {dataGaji.map((data) => (
                  <tr key={data.nomor}>
                    <td className="p-1 pt-2">{data.nomor}</td>
                    <td>{data.bulan}</td>
                    <td>{data.gaji}</td>
                    <td>{data.tunjangan}</td>
                    <td>{data.potongan}</td>
                    <td>{data.total}</td>
                    <td>{getStatus(data.status_gaji)}</td>
                    <td className='font-semibold'>
                      <button onClick={() => downloadPDF(data.id)} className='flex justify-start items-center'>
                        {data.action}
                        <IoDownloadOutline fontSize={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Penggajian;
