// import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-2/5 h-full flex flex-col bg-green-900">
        <div className="absolute top-[40%] left-[5%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4 tracking-tight md:tracking-super-wide">S!MATREN</h1>
          <p className="text-xl text-white font-normal">Pondok Pesantren Husnul Khotimah</p>
        </div>
      </div>

      <div className="w-3/5 h-full flex flex-col p-20 justify-between">
        <div className="relative box-border h-full w-full p-10 border border-green-900 rounded-md shadow-lg shadow-gray-500">
          <div className="w-full flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-4 text-green-900">Login</h3>
          </div>

          <div className="w-full flex flex-col">
            <p className="text-sm font-sans py-4">Your email</p>
            <input 
              type="email"
              placeholder="name@company.com"
              className="w-full text-sm text-black bg-gray-100 border border-gray-300 rounded-md p-2" 
            />

            <p className="text-sm font-sans py-4">Password</p>
            <input 
              type="password"
              placeholder="******"
              className="w-full text-sm text-black bg-gray-100 border border-gray-300 rounded-md p-2" 
            />
          </div>

          <div className="w-full flex flex-col py-16">
            <button className="text-white bg-green-900 rounded-md p-2 text-center flex items-center justify-center">
              Log in
            </button>

            <div className="w-full flex items-center justify-center p-3">
              <span className="text-xs font-sans text-green-900 cursor-pointer">Forgot Password?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
