import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Role = () => {
    const { id_presensi } = useParams();
    const [questions, setQuestions] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [idRole, setIdRole] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const id_pegawai = localStorage.getItem('id_pegawai');

        if (id_pegawai) {
            axios.get(`https://backend.simatren.space/api/data_pegawai/pegawai/profil/${id_pegawai}`)
                .then(response => {
                    const role = response.data.id_role;
                    setIdRole(role);
                    return axios.get(`https://backend.simatren.space/api/data_role/role/${role}`);
                })
                .then(response => {
                    const questionsData = response.data;
                    setQuestions(questionsData);

                    const initialCheckedState = {};
                    questionsData.forEach(item => {
                        initialCheckedState[item.id_deskripsi] = false;
                    });
                    setCheckedItems(initialCheckedState);
                })
                .catch(error => {
                    console.error('There was an error fetching the data:', error);
                });
        } else {
            console.error('id_pegawai is not defined in localStorage');
        }
    }, []);

    const handleCheckboxChange = (id_deskripsi) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [id_deskripsi]: !prevState[id_deskripsi],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id_pegawai = localStorage.getItem('id_pegawai');
        if (!id_pegawai) {
            console.error('id_pegawai is not defined in localStorage');
            return;
        }

        const dataToSend = questions.map(question => ({
            id_pegawai,
            id_deskripsi: question.id_deskripsi,
            id_presensi,
            tanggal: new Date().toISOString(),
            jawaban: checkedItems[question.id_deskripsi] || false,
        }));

        axios.post('https://backend.simatren.space/api/data_role/transaksi_role', dataToSend)
            .then(response => {
                console.log('Data successfully submitted');
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate(`/UserPage/lengkapi_presensi/${id_presensi}`);
                }, 2000);
            })
            .catch(error => {
                console.error('There was an error submitting the data:', error);
            });
    };

    return (
        <div className="px-5">
            <span className="text-2xl text-gray-950 font-semibold flex justify-center">Aktivitas Harian</span>
            <div className='md:w-[60%] w-[100%] mx-auto h-full flex flex-col py-5 justify-between'>
                <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <table className="w-full">
                                <tbody>
                                    {questions.map((question) => (
                                        <tr key={question.id_deskripsi}>
                                            <td className="p-2 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="p-2 mr-2 w-4 h-4 flex-shrink-0"
                                                    checked={checkedItems[question.id_deskripsi] || false}
                                                    onChange={() => handleCheckboxChange(question.id_deskripsi)}
                                                />
                                                <span className="text-sm">{question.pertanyaan_role}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-row px-3 justify-center gap-4 mx-auto">
                            <button
                                type="submit"
                                className="w-28 text-black bg-green-900 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Kirim
                            </button>
                        </div>
                    </form>

                    {showPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white font-semibold text-green-900 px-12 py-5 rounded-md shadow-lg">
                                <p>Aktivitas Harian Berhasil Dikirim</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Role;
