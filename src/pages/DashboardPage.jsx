import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi
import LogoOrange from '../assets/logo-Orange.png'; // Logo utama
import ProfileLogo from '../assets/ProfileLogo.png'; // Gambar Profile
import Forum from '../components/Forum'; // Import Komponen Forum
import KelolaMentor from '../components/KelolaMentor'; // Import Komponen KelolaMentor
import SignOutIcon from '../assets/SignOut.png'; // Logo SignOut
import ForumBelajarAktif from '../assets/ForumBelajar-Active.png'; // Logo Forum Belajar Aktif
import ForumBelajarInactive from '../assets/ForumBelajar-Inactive.png'; // Logo Forum Belajar Inaktif
import ForumSayaInactive from '../assets/ForumSaya-Inactive.png'; // Logo Forum Saya Inaktif
import ForumSayaAktif from '../assets/ForumSaya-Active.png'; // Logo Forum Saya Aktif
import TransaksiAktif from '../assets/Transaksi-Active.png'; // Logo Transaksi Aktif
import TransaksiInactive from '../assets/Transaksi-Inactive.png'; // Logo Transaksi Inaktif
import KelolaMentorAktif from '../assets/KelolaMentor-Active.png'; // Logo KelolaMentor Aktif
import KelolaMentorInactive from '../assets/KelolaMentor-Inactive.png'; // Logo KelolaMentor Inaktif
import { AuthContext } from '../context/AuthContext';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState('forumBelajar'); // Default menu: Forum Belajar
  const [pendingTeachers, setPendingTeachers] = useState({data: []}); // State untuk data teacher pending
  const { user, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); // Untuk navigasi halaman

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token
    sessionStorage.removeItem('token');
    setIsAuthenticated(false); // Update status login
    setUser(null);
    navigate('/'); // Redirect ke login
  };

  useEffect(() => {
    if (activeMenu === 'kelolaMentor') {
        // Define a variable to store the response
        const fetchPendingTeachers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/admin/pending-teacher`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch pending teachers');
                }
                const data = await response.json();
                setPendingTeachers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchPendingTeachers();
    }
}, [activeMenu]); // Hanya fetch ulang jika activeMenu berubah

const handleApprove = async (teacherId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/pending-teacher/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ action: 'approve' }),
    });

    if (!response.ok) {
      throw new Error('Failed to approve teacher');
    }

     // Perbarui state untuk menghapus teacher yang sudah disetujui
     setPendingTeachers((prev) => ({
      ...prev,
      data: prev.data.filter((teacher) => teacher.id !== teacherId),
    }));
  } catch (error) {
    console.error('Error approving teacher:', error);
  }
};

const handleReject = async (teacherId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/pending-teacher/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ action: 'reject' }),
    });

    if (!response.ok) {
      throw new Error('Failed to reject teacher');
    }

    // Update state untuk menghapus teacher yang ditolak
    setPendingTeachers((prev) => ({
      ...prev,
      data: prev.data.filter((teacher) => teacher.id !== teacherId),
    }));
  } catch (error) {
    console.error('Error rejecting teacher:', error);
  }
};

  // Menentukan konten berdasarkan menu aktif
  const renderRightSectionContent = () => {
    switch (activeMenu) {
      case 'forumBelajar':
        return (
          <div className="grid grid-cols-3 gap-6">
            <Forum courseId={1} />
            <Forum courseId={2} />
            <Forum courseId={3} />
            <Forum courseId={1} />
            <Forum courseId={2} />
            <Forum courseId={3} />
            <Forum courseId={1} />
            <Forum courseId={2} />
            <Forum courseId={3} />
          </div>
        );
      case 'forumSaya':
        return <div className="text-center">Forum Saya - Konten akan ditambahkan di sini.</div>;
      case 'transaksi':
        return <div className="text-center">Transaksi - Konten akan ditambahkan di sini.</div>;
      case 'kelolaMentor':
        return (
          <div>
             {pendingTeachers.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                    <p>Tidak ada mentor yang menunggu persetujuan.</p>
                </div>
            ) : (
              <div className="grid grid-cols-4 gap-6">
                {pendingTeachers.data.map((teacher) => (
                  <KelolaMentor
                    key={teacher.id}
                    teacher={teacher}
                    onApprove={() => handleApprove(teacher.id)} // Fungsi untuk menyetujui
                    onReject={() => handleReject(teacher.id)} // Fungsi untuk menolak
                    setActiveMenu={setActiveMenu}
                  />
                ))}
            </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className="w-[18%] bg-white relative border-r border-[#FFA726] flex flex-col items-center py-6 space-y-6"
        style={{ minHeight: '100vh' }}
      >
        {/* Logo */}
        <img src={LogoOrange} alt="Logo Orange" className="w-16" />

        {/* Profile */}
        <div className="flex flex-col items-center space-y-2">
          <img src={`${BASE_URL}/${user.picture}`} alt="Profile" className="w-14 h-14 rounded-full" />
          <h2 className="text-lg font-semibold text-center">{user.name}</h2>
          <p className="text-gray-500 text-sm text-center">{user.role}</p>
        </div>

        {/* Menu */}
        <div className="w-full px-4 space-y-4">
          {/* Forum Belajar */}
          <button
            className={`w-full flex justify-center py-2 rounded-lg ${
              activeMenu === 'forumBelajar' ? 'bg-[#FFA726]' : 'bg-white'
            }`}
            onClick={() => setActiveMenu('forumBelajar')}
          >
            <img
              src={activeMenu === 'forumBelajar' ? ForumBelajarAktif : ForumBelajarInactive}
              alt="Forum Belajar"
              className="w-[80%] h-8 object-contain" // Ukuran lebih kecil
            />
          </button>

          {/* Forum Saya */}
          {user?.role !== 'admin' && (
          <button
            className={`w-full flex justify-center py-2 rounded-lg ${
              activeMenu === 'forumSaya' ? 'bg-[#FFA726]' : 'bg-white'
            }`}
            onClick={() => setActiveMenu('forumSaya')}
          >
            <img
              src={activeMenu === 'forumSaya' ? ForumSayaAktif : ForumSayaInactive}
              alt="Forum Saya"
              className="w-[80%] h-8 object-contain" // Ukuran lebih kecil
            />
          </button>
          )}

          {/* Transaksi */}
          {user?.role !== 'admin' && (
          <button
            className={`w-full flex justify-center py-2 rounded-lg ${
              activeMenu === 'transaksi' ? 'bg-[#FFA726]' : 'bg-white'
            }`}
            onClick={() => setActiveMenu('transaksi')}
          >
            <img
              src={activeMenu === 'transaksi' ? TransaksiAktif : TransaksiInactive}
              alt="Transaksi"
              className="w-[80%] h-8 object-contain" // Ukuran lebih kecil
            />
          </button>
          )}

          {/* Kelola Mentor */}
          {user?.role === 'admin' && (
          <button
            className={`w-full flex justify-center py-2 rounded-lg ${
              activeMenu === 'kelolaMentor' ? 'bg-[#FFA726]' : 'bg-white'
            }`}
            onClick={() => setActiveMenu('kelolaMentor')}
          >
            <img
              src={activeMenu === 'kelolaMentor' ? KelolaMentorAktif : KelolaMentorInactive}
              alt="Kelola Mentor"
              className="w-[80%] h-8 object-contain" // Ukuran lebih kecil
            />
          </button>
          )}
        </div>

        {/* Sign Out */}
        <button
          className="w-full flex justify-center py-2 mt-auto rounded-lg"
          onClick={handleLogout} // Navigasi ke landing page
        >
          <img src={SignOutIcon} alt="Sign Out" className="w-[35%] h-auto" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold capitalize">
            {activeMenu.replace('forum', 'Forum ').replace('transaksi', 'Transaksi').replace('kelola', 'Kelola ')}
          </h1>
          <div className="flex items-center bg-[#F7F7F7] px-4 py-2 rounded-md">
            <input
              type="text"
              className="bg-transparent border-none outline-none"
              placeholder="Search..."
            />
            <button className="ml-2 text-[#FFA726]">🔍</button>
          </div>
        </div>

        {/* Render Konten berdasarkan Menu */}
        {renderRightSectionContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
