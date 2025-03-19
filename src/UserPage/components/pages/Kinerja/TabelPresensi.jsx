import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function TabelPresensi() {
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const id_pegawai = localStorage.getItem('id_pegawai');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const presensiResponse = await axios.get(`https://be-simatren.riset-d3rpla.com/api/data_presensi/presensi/daily/${id_pegawai}`);
                const presensiData = presensiResponse.data;

                const cutiResponse = await axios.get(`https://be-simatren.riset-d3rpla.com/api/data_cuti/cuti/approved/${id_pegawai}`);
                const cutiData = cutiResponse.data;

                const monthlyData = processMonthlyData(presensiData, cutiData);
                setData(monthlyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id_pegawai]);

    const processMonthlyData = (presensiData, cutiData) => {
        const months = moment.monthsShort();
        const monthlySummary = months.map((month, index) => {
            const monthNumber = index + 1;
            const year = moment().year();

            const startDate = moment(`${year}-${monthNumber}-01`).startOf('month');
            const endDate = moment(startDate).endOf('month');

            const presensiCount = presensiData.reduce((count, item) => {
                const date = moment(item.date);
                if (date.isBetween(startDate, endDate, null, '[]')) {
                    return count + item.Hadir;
                }
                return count;
            }, 0);

            const cutiCount = cutiData.reduce((count, item) => {
                const cutiStartDate = moment(`${item.tahun}-${item.bulan}-01`).startOf('month');
                const cutiEndDate = moment(cutiStartDate).endOf('month');
                if (cutiStartDate.isSameOrAfter(startDate) && cutiEndDate.isSameOrBefore(endDate)) {
                    return count + item.jumlah_cuti;
                }
                return count;
            }, 0);

            const weekdayCount = weekdayCalc(startDate, endDate, 1, 5);
            const tidakHadir = weekdayCount - presensiCount - cutiCount;

            return {
                month: month,
                Hadir: presensiCount,
                Cuti: cutiCount,
                TidakHadir: tidakHadir
            };
        });

        return monthlySummary;
    };

    const weekdayCalc = (startDate, endDate, startDay, endDay) => {
        let count = 0;
        const current = startDate.clone();

        while (current.isSameOrBefore(endDate)) {
            const day = current.isoWeekday();
            if (day >= startDay && day <= endDay) {
                count++;
            }
            current.add(1, 'days');
        }

        return count;
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    // Filter data based on selected month
    const filteredData = data.filter(item => !selectedMonth || moment().month(item.month).format('MM') === selectedMonth);

    // Calculate totals
    const totals = filteredData.reduce((acc, item) => {
        acc.Hadir += item.Hadir;
        acc.Cuti += item.Cuti;
        acc.TidakHadir += item.TidakHadir;
        return acc;
    }, { Hadir: 0, Cuti: 0, TidakHadir: 0 });

    return (
        <div>
            <div className="px-4 rounded-sm border-[1.5px] border-gray-200 items-center shadow-md shadow-gray-400">
                <strong className="text-gray-700 font-medium mt-4 block">Presensi</strong>
                {/* Dropdown filter bulan */}
                <div className="flex justify-start mt-4 text-sm">
                    <select
                        className="border rounded px-2 py-1"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <option value="">All</option>
                        <option value="01">Januari</option>
                        <option value="02">Februari</option>
                        <option value="03">Maret</option>
                        <option value="04">April</option>
                        <option value="05">Mei</option>
                        <option value="06">Juni</option>
                        <option value="07">Juli</option>
                        <option value="08">Agustus</option>
                        <option value="09">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </select>
                </div>

                {/* Tabel Presensi */}
                <div className="h-72 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto text-sm">
                    <table className='text-gray-700 min-w-[900px]'>
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b-[1.5px]">
                                <td className='font-bold py-4'>No.</td>
                                <td className='font-bold py-4'>Keterangan</td>
                                <td className='font-bold py-4'>Jumlah</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">Tidak ada data untuk ditampilkan</td>
                                </tr>
                            ) : (
                                <><tr className="border-b-[1.5px]">
                                    <td className='py-4'>1</td>
                                    <td className='py-4'>Hadir</td>
                                    <td className='py-4'>{totals.Hadir}</td>
                                </tr><tr className="border-b-[1.5px]">
                                        <td className='py-4'>2</td>
                                        <td className='py-4'>Cuti</td>
                                        <td className='py-4'>{totals.Cuti}</td>
                                    </tr><tr className="border-b-[1.5px]">
                                        <td className='py-4'>3</td>
                                        <td className='py-4'>Tidak Hadir</td>
                                        <td className='py-4'>{totals.TidakHadir}</td>
                                    </tr></>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TabelPresensi;
