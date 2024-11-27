import React, { useState } from 'react';
import LogoOrange from '../assets/logo-Orange.png';
import LoginIllustration from '../assets/LoginIlus.png';
import Mentor from '../assets/mentor.png';
import Tentor from '../assets/tentor.png';
import MentorOrange from '../assets/Mentor-Orange.png';
import TentorWhite from '../assets/Tentor-White.png';

const RegisterPage = () => {
  // State untuk menangani tombol yang aktif
  const [isMentor, setIsMentor] = useState(true);  // default is Mentor

  return (
    <div className="flex min-h-screen relative">
      {/* Logo Orange */}
      <a href="/"> {/* Ganti "/landingpage" dengan URL tujuan Anda */}
        <img
          src={LogoOrange}
          alt="Logo"
          className="absolute top-10 left-10"
          style={{ width: '154.5px', height: '44.25px' }}
        />
      </a>

      {/* Left Section */}
      <div
        className="flex flex-col items-center justify-center w-1/2"
        style={{ backgroundColor: '#FFF6E9' }}
      >
        {/* Illustration */}
        <img
          src={LoginIllustration}
          alt="Illustration"
          style={{ width: '558px', height: '350px' }}
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white p-10">
        {/* Bagian untuk Menjaga Posisi "Membuat Akun" dan Opsi Mentor/Tentor */}
        <div className="absolute top-20 w-full">
          <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontWeight: '1000' }}>Membuat Akun</h1>

          {/* Tombol Mentor dan Tentor */}
          <div className="flex space-x-4 mb-8 justify-center">
            <button
              className={`flex items-center ${isMentor ? 'bg-[#FFA726] text-white border-none' : 'bg-white text-[#FFA726] border-2 border-[#FFA726]'} px-8 py-2 rounded-md space-x-1`}
              style={{ width: '142px', height: '40px' }}
              onClick={() => setIsMentor(true)}  // Set state ke Mentor
            >
              <img src={isMentor ? Mentor : MentorOrange} alt="Mentor Logo" className="h-5 w-5" />
              <span>Mentor</span>
            </button>
            <button
              className={`flex items-center ${!isMentor ? 'bg-[#FFA726] text-white border-none' : 'bg-white text-[#FFA726] border-2 border-[#FFA726]'} px-8 py-2 rounded-md space-x-1`}
              style={{ width: '142px', height: '40px' }}
              onClick={() => setIsMentor(false)}  // Set state ke Tentor
            >
              <img src={isMentor ? Tentor : TentorWhite} alt="Tentor Logo" className="h-5 w-5" />
              <span>Tentor</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4 w-1/2 mt-36"> {/* Tambahkan margin atas */}
          {/* Nama Lengkap */}
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{
              border: 'none',
              fontSize: '13px',
            }}
          />
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{
              border: 'none',
              fontSize: '13px',
            }}
          />
          {/* Nomor Handphone */}
          <input
            type="tel"
            placeholder="Nomor Handphone"
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{
              border: 'none',
              fontSize: '13px',
            }}
          />

          {/* Jika Tentor, tampilkan form jurusan */}
          {!isMentor && (
            <input
              type="text"
              placeholder="Jurusan"
              className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
              required
              style={{
                border: 'none',
                fontSize: '13px',
              }}
            />
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{
              border: 'none',
              fontSize: '13px',
            }}
          />
        </form>

        {/* Tombol Daftar */}
        <button
          className="mt-11 bg-[#FFA726] px-6 py-2 text-white rounded-md text-center flex items-center justify-center text-center"
          style={{
            fontSize: '13px',
            fontWeight: 'bold',
            padding: '10px 48px',
          }}
        >
          Daftar
        </button>

        {/* Pendaftaran Akun */}
        <p className="mt-4 text-[#000000] text-center"
          style={{
            fontSize: '9px',
            fontWeight: '300',
          }}>
          Sudah punya akun?{' '}
          <a href="/login" className="text-[#000000]"
            style={{
              fontSize: '9px',
              fontWeight: '1000',
            }}>
            Login di sini
          </a>
        </p>
        
      </div>
    </div>
  );
};

export default RegisterPage;
