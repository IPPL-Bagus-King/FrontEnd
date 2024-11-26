import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoWhite from '../assets/logo-White.png';
import PeopleImage from '../assets/People.png';
import WaveBG from '../assets/WaveBG.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fff6e9' }}>
        {/* Navbar */}
        <nav className="flex justify-between items-center px-10 py-5" style={{ backgroundColor: '#FFA726' }}>
        <img src={LogoWhite} alt="Logo" className="h-10" />
        <div className="flex items-center space-x-3">
            {/* Tombol Daftar */}
            <button
            onClick={() => navigate('/register')}
            className="border border-white text-white font-bold px-6 py-2 rounded-full hover:bg-white hover:text-[#FFA726] transition-all"
            >
            Daftar
            </button>
            {/* Divider */}
            <div className="w-px h-8 bg-white"></div>
            {/* Tombol Masuk */}
            <button
            onClick={() => navigate('/login')}
            className="border border-white text-white font-bold px-6 py-2 rounded-full hover:bg-white hover:text-[#FFA726] transition-all"
            >
            Masuk
            </button>
        </div>
        </nav>

    {/* Main Section */}
    <div className="flex flex-1">
    {/* Left Section (Text Content) */}
    <div className="w-1/2 flex flex-col justify-center px-10">
        <h1 className="text-5xl font-bold text-[#FFA726] mb-6 leading-tight">
        Jadi Mahasiswa<br /> Jangan Sampai Gak<br /> Paham Materi!
        </h1>

        <p className="text-gray-600 text-lg mb-6">
        Jadikan Tutor.in sebagai solusi untuk kamu yang membutuhkan mentor
        belajar. Bikin belajar jadi mudah dan praktis dengan para Mentor kami.{' '}
        <span className="text-[#FFA726] font-bold">#UntungAdaTutorin</span>
        </p>

        {/* Div for button alignment */}
        <div className="flex justify-start">
        <button className="bg-[#FFA726] text-white px-5 py-2 rounded-md">
            Daftar Sekarang
        </button>
        </div>
    </div>

        {/* Right Section (Wave & People Image) */}
        <div className="w-1/2 relative flex items-center justify-center">
          <img
            src={WaveBG}
            alt="Wave Background"
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
          <img
            src={PeopleImage}
            alt="People"
            className="relative z-10 max-w-xs md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
