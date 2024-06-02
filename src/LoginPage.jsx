import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleLogin = () => {
    // Dummy user data for demonstration
    const adminCredentials = { email: "admin@admin.com", password: "admin123" };
    const userCredentials = { email: "user@user.com", password: "user123" };

    if (selectedOption === 'admin') {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        login('admin');
        navigate('/AdminPage');
      } else {
        alert('Email atau Password Admin Salah');
      }
    } else if (selectedOption === 'user') {
      if (email === userCredentials.email && password === userCredentials.password) {
        login('user');
        navigate('/UserPage');
      } else {
        alert('Email atau Password Admin Salah');
      }
    } else {
      alert('Lengkapi Data Terlebih Dahulu');
    }
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

          <hr className="border-t border-green-700 my-4 mt-8" />

          <div>
            <p className="text-xs font-sans mb-4 text-green-900">Masuk Sebagai :</p>

            <form className="flex flex-row gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="admin"
                  name="options"
                  value="admin"
                  checked={selectedOption === 'admin'}
                  onChange={handleOptionChange}
                  className="form-radio text-green-900"
                />
                <label htmlFor="admin" className="ml-2 text-xs">
                  Admin
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="user"
                  name="options"
                  value="user"
                  checked={selectedOption === 'user'}
                  onChange={handleOptionChange}
                  className="form-radio bg-green-900"
                />
                <label htmlFor="user" className="ml-2 text-xs">
                  User
                </label>
              </div>
            </form>
          </div>

          <div className="w-full flex flex-col py-5">
            <button onClick={handleLogin} className="text-white bg-green-900 rounded-md p-2 text-center flex items-center justify-center">
              Log in
            </button>

            <div className="w-full flex items-center justify-center p-3">
              <span className="text-xs font-sans text-green-900 cursor-pointer">Forgot Password?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
