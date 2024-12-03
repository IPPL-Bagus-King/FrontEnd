import React, { useState, useContext } from 'react';
import LogoOrange from '../assets/logo-Orange.png';
import LoginIllustration from '../assets/LoginIlus.png';
import Mentor from '../assets/mentor.png';
import Tentor from '../assets/tentor.png';
import MentorOrange from '../assets/Mentor-Orange.png';
import TentorWhite from '../assets/Tentor-White.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  // State untuk menangani tombol yang aktif
  const [isMentor, setIsMentor] = useState(true);  // default is Mentor

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Simpan token dan update status login
        localStorage.setItem('token', result.token);
        // Dekode token untuk mendapatkan data pengguna
        const decoded = jwtDecode(result.token);
        setUser(decoded);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        alert(result.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan, coba lagi nanti.');
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Logo Orange */}
      <a href="/">
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
        {/* Judul di Tengah */}
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontWeight: '1000' }}>
          Masuk Akun
        </h1>

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

        {/* Form */}
        <form className="space-y-4 w-1/2" onSubmit={handleLogin}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{ border: 'none', fontSize: '13px' }}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181]"
            required
            style={{ border: 'none', fontSize: '13px' }}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="border-2 border-[#818181] focus:ring-[#818181]"
            />
            <label htmlFor="rememberMe" className="text-[#818181]" style={{ fontSize: '11px' }}>
              Remember me
            </label>
          </div>

          {/* Tombol Masuk - Bungkus dengan div untuk tengah dan margin */}
            <div
              className="mt-8 flex justify-center"
              style={{
                paddingTop: '24px', // Gunakan paddingTop dengan huruf kapital
              }}
            >
              <button
                type="submit"
                className="bg-[#FFA726] px-6 py-2 text-white rounded-md text-center flex items-center justify-center text-center"
                style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  padding: '12px 48px',
                }}
              >
                Masuk
              </button>
            </div>

        </form>

        {/* Pendaftaran Akun */}
        <p className="mt-4 text-[#000000] text-center" style={{ fontSize: '9px', fontWeight: '300' }}>
          Belum punya akun?{' '}
          <a href="/register" className="text-[#000000]" style={{ fontSize: '9px', fontWeight: '1000' }}>
            Register di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
