import React, { useState, useContext } from 'react';
import LogoOrange from '../assets/logo-Orange.png';
import LoginIllustration from '../assets/LoginIlus.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/login/`, {
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

        // Validasi status pengguna
        if (decoded.status !== 'approved') {
          // Hapus token dari localStorage karena login gagal
          localStorage.removeItem('token');
          Swal.fire({
            title: 'Akun belum disetujui!',
            text: 'Akun anda masih dalam proses pengecekan oleh admin.',
            icon: 'warning',
            customClass: {
              confirmButton: 'custom-ok-button',
            },
          });
          return; // keluar dari proses login
        }

        setUser(decoded);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        Swal.fire({
          title: result.message,
          text: 'Periksa kembali email dan password Anda',
          icon: 'error',
          //color: "#FFA726",
          customClass: {
            confirmButton: 'custom-ok-button', // Tambahkan kelas kustom
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan, coba lagi nanti.');
    }
  };

  return (
    <motion.div
      className='flex min-h-screen relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo Orange */}
      <a href='/'>
        <img
          src={LogoOrange}
          alt='Logo'
          className='absolute top-10 left-10'
          style={{ width: '154.5px', height: '44.25px' }}
        />
      </a>

      {/* Left Section */}
      <div
        className='flex flex-col items-center justify-center w-1/2'
        style={{ backgroundColor: '#FFF6E9' }}
      >
        <motion.img
          src={LoginIllustration}
          alt='Illustration'
          style={{ width: '558px', height: '350px' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Right Section */}
      <motion.div
        className='flex flex-col justify-center items-center w-1/2 bg-white p-10'
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className='text-4xl font-bold mb-8 text-center'
          style={{ fontWeight: '1000' }}
        >
          Masuk Akun
        </h1>

        {/* Form */}
        <motion.form
          className='space-y-4 w-1/2'
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Email */}
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            className='block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins'
            required
            style={{ border: 'none', fontSize: '13px' }}
          />

          {/* Password */}
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id='password'
            className='block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181]'
            required
            style={{ border: 'none', fontSize: '13px' }}
          />

          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='rememberMe'
              className='border-2 border-[#818181] focus:ring-[#818181]'
            />
            <label
              htmlFor='rememberMe'
              className='text-[#818181]'
              style={{ fontSize: '11px' }}
            >
              Remember me
            </label>
          </div>

          {/* Tombol Masuk */}
          <div className='mt-8 flex justify-center'>
            <button
              type='submit'
              className='bg-[#FFA726] px-6 py-2 text-white rounded-md text-center flex items-center justify-center text-center'
              style={{
                fontSize: '13px',
                fontWeight: 'bold',
                padding: '12px 48px',
              }}
            >
              Masuk
            </button>
          </div>
        </motion.form>

        {/* Pendaftaran Akun */}
        <p
          className='mt-4 text-[#000000] text-center'
          style={{ fontSize: '11px', fontWeight: '300' }}
        >
          Belum punya akun?{' '}
          <a
            href='/register'
            className='text-[#000000]'
            style={{ fontSize: '11px', fontWeight: '1000' }}
          >
            Register di sini
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
