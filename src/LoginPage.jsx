import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://be-simatren.riset-d3rpla.com/api/auth/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('nama_pegawai', response.data.nama_pegawai);
      localStorage.setItem('nip', response.data.nip);
      localStorage.setItem('id_pegawai', response.data.id_pegawai);
      
      login(response.data.email, response.data.nama_pegawai, response.data.nip, response.data.id_pegawai);

      if (response.data.email === 'admin@gmail.com') {
        console.log('Navigating to /AdminPage');
        navigate('/AdminPage');
      } else {
        console.log('Navigating to /UserPage');
        navigate('/UserPage');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login gagal. Email atau Password salah!');
      setShowError(true);
    }
  };

  const closeModal = () => {
    setShowError(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center md:justify-between">
      <div className="md:block hidden relative w-full md:w-2/5 h-full flex-col bg-green-900">
        <div className="absolute top-[40%] left-[5%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4 tracking-tight md:tracking-super-wide">S!MATREN</h1>
          <p className="text-xl text-white font-normal">Pondok Pesantren Husnul Khotimah</p>
        </div>
      </div>

      <div className="min-h-screen md:h-full md:p-10 w-3/5 flex items-center justify-between">
        <div className="relative box-border h-full w-full p-6 md:p-10 border border-green-900 rounded-md shadow-lg shadow-gray-500">
          <div className="w-full flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-4 text-green-900">Login</h3>
          </div>

          <div className="w-full flex flex-col">
            <p className="text-sm font-sans py-4">Your email</p>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full text-sm text-black bg-gray-100 border border-gray-300 rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="text-sm font-sans py-4">Password</p>
            <input
              type="password"
              placeholder="******"
              className="w-full text-sm text-black bg-gray-100 border border-gray-300 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col py-16">
            <button onClick={handleLogin} className="text-white bg-green-900 rounded-md p-2 text-center flex items-center justify-center">
              Log in
            </button>

            <div className="w-full flex items-center justify-center p-3">
              <span className="text-xs font-sans">
                Butuh Bantuan?
                <a 
                  href="https://wa.me/6281945443025?text=Nama:%20%0A%0ANIP:%20%0A%0AKebutuhan:%20%0A%0AIsi%20pesan%20keluhan%20Anda%20di%20sini." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-900"
                >
                  Hubungi Admin
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm">
            <p className="text-red-600">{error}</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
