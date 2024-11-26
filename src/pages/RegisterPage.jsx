import React from 'react';
import LogoOrange from '../assets/logo-Orange.png';
import LoginIllustration from '../assets/LoginIlus.png';

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div
        className="flex flex-col items-center justify-center w-1/2"
        style={{ backgroundColor: '#FFF6E9' }}
      >
        <img src={LogoOrange} alt="Logo" className="h-12 mb-6" />
        <img
          src={LoginIllustration}
          alt="Illustration"
          className="w-2/3 max-w-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white p-10">
        <h1 className="text-4xl font-bold mb-12 text-center">Membuat Akun</h1>

        {/* Tombol Mentor dan Tentor */}
        <div className="flex space-x-4 mb-8 justify-center">
          <button className="bg-[#FFA726] text-[#FFFFFF] px-5 py-2 rounded-md">
            Mentor
          </button>
          <button className="border border-orange-400 text-orange-400 px-5 py-2 rounded-md">
            Tentor
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4 w-3/4">
          {/* Nama Lengkap */}
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md mx-auto"
            required
          />
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md mx-auto"
            required
          />
          {/* Nomor Handphone */}
          <input
            type="tel"
            placeholder="Nomor Handphone"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md mx-auto"
            required
          />
          {/* Nomor Rekening */}
          <input
            type="text"
            placeholder="Nomor Rekening"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md mx-auto"
            required
          />
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md mx-auto"
            required
          />

          {/* Tombol Daftar */}
          <button className="bg-[#FFA726] text-white px-5 py-2 rounded-md mx-auto block">
            Daftar
          </button>
        </form>

        {/* Pendaftaran Akun */}
        <p className="mt-6 text-gray-600 text-center">
          Sudah punya akun?{' '}
          <a href="/login" className="text-[#FFA726]">
            Masuk disini
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
