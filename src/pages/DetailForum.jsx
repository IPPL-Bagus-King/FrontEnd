import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ForumDetail from '../components/ForumDetail';  // Import ForumDetail
import LogoWhite from '../assets/logo-White.png';  // Import logo putih

const DetailForum = () => {
  const { id } = useParams();  // Ambil id dari URL
  const navigate = useNavigate(); // Hook untuk navigasi
  const [isNavbarVisible, setNavbarVisible] = useState(true); // State untuk menentukan apakah navbar terlihat

  // Fungsi untuk mendeteksi scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarVisible(false); // Navbar akan hilang setelah scroll 50px
    } else {
      setNavbarVisible(true); // Navbar muncul kembali saat scroll di atas 50px
    }
  };

  useEffect(() => {
    // Menambahkan event listener saat komponen dipasang
    window.addEventListener('scroll', handleScroll);

    // Menghapus event listener saat komponen dibersihkan
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="p-6">
      {/* Navbar Kecil */}
      <div
        className={`bg-[#FFA726] p-4 flex items-center justify-between fixed top-0 left-0 right-0 rounded-b-xl shadow-lg transition-opacity duration-120 ${
          isNavbarVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={LogoWhite}
          alt="Logo"
          className="h-6 cursor-pointer"
          onClick={() => navigate('/dashboard')} // Arahkan ke dashboard saat logo diklik
        />
      </div>
      
      {/* Panggil ForumDetail dan pass id sebagai props */}
      <ForumDetail forumId={id} />
    
    </div>
  );
};

export default DetailForum;
