import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi
import LogoOrange from '../assets/logo-Orange.png'; // Logo utama
import Forum from '../components/Forum'; // Import Komponen Forum
import MyForum from '../components/MyForum'; // Import Komponen Forum
import CreateForum from '../components/CreateForum';
import HistoryCheckout from '../components/HistoryCheckout'; // Import Komponen Forum
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
import { 
  fetchForums, 
  fetchForumsByTeacherId,
  fetchTeacher, 
  fetchRating,
  approveTeacher, 
  rejectTeacher,
  fetchPendingTeachers,
} from '../services/apiService';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DashboardPage = () => {
  const { user, setIsAuthenticated } = useContext(AuthContext);
  const getDefaultMenu = (role) => { return role === 'teacher' ? 'forumTentor' : 'forumBelajar'; };
  const [activeMenu, setActiveMenu] = useState(() => getDefaultMenu(user?.role)); // Default menu dashboard berdasarkan role
  const navigate = useNavigate(); // Untuk navigasi halaman
  
  const [forums, setForum] = useState([]);
  const [teacherForums, setTeacherForums] = useState([]);
  const [pendingTeachers, setPendingTeachers] = useState({data: []}); // State untuk data teacher pending
  const [historyCheckout, setHistoryCheckout] = useState([]);
  const [forumsHistory, setForumsHistory] = useState([]);


  // Fetch history checkout
  const fetchHistoryCheckout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/checkout/history`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch checkout history: ${response.statusText}`);
      }

      const result = await response.json();

      const enrichedHistoryForums = await Promise.all(
        result.data.map(async (forum) => {
          try {
            const teacherData = await fetchTeacher(forum.forum.teacher_id);
            const ratingData = await fetchRating(forum.forum.id);

            return {
              ...forum,
              name: forum.forum.name,
              description: forum.forum.description,
              price: forum.forum.price,
              picture: forum.forum.picture,
              teacher_name: teacherData.data.username,
              teacher_picture: teacherData.data.picture,
              rating: ratingData.averageRating || "N/A",
            };
          } catch (error) {
            console.error(`Error enriching forum with id ${forum.id}:`, error);
            return forum;
          }
        })
      );

      setHistoryCheckout(enrichedHistoryForums); 
      const forumHistory = await Promise.all(
        enrichedHistoryForums.map(async (forum) => {
          try {
            if (forum.status !== 'settlement') {
              return null;
            }

            const response = await fetch(`${BASE_URL}/forum/${forum.id_forum}`,
              {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch forum with id ${forum.id_forum}`);
            }
            const result = await response.json();
            return result.data;
          } catch (error) {
            console.error(`Error fetching forum with id ${forum.id_forum}:`, error);
            return null;
          }
        })
      );
      
      const filteredForumHistory = forumHistory.filter((forum) => forum !== null);

      const enrichedForums = await Promise.all(
        filteredForumHistory.map(async (forum) => {
          try {
            const teacherData = await fetchTeacher(forum.teacher_id);
            const ratingData = await fetchRating(forum.id);
            return {
              ...forum,
              teacher_name: teacherData.data.username,
              teacher_picture: teacherData.data.picture,
              rating: ratingData.averageRating || "N/A",
            };
          } catch (error) {
            console.error(`Error enriching forum with id ${forum.id}:`, error);
            return forum;
          }
        })
      );

      setForumsHistory(enrichedForums);
    } catch (error) {
      console.error("Error fetching history checkout:", error);
    }
  };

  const fetchData = async () => {
    try {
      const forumData = await fetchForums();

      const enrichedForums = await Promise.all(
        forumData.data.map(async (forum) => {
          try {
            const teacherData = await fetchTeacher(forum.teacher_id);
            const ratingData = await fetchRating(forum.id);

            return {
              ...forum,
              teacher_name: teacherData.data.username,
              teacher_picture: teacherData.data.picture,
              rating: ratingData.averageRating || "N/A",
            };
          } catch (error) {
            console.error(`Error enriching forum with id ${forum.id}:`, error);
            return forum;
          }
        })
      );

      setForum(enrichedForums);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (user?.role !== 'teacher') {
        await fetchData();
        await fetchHistoryCheckout();
      }
    };
    fetchAllData();
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token
    sessionStorage.removeItem('token');
    setIsAuthenticated(false); // Update status login
    // setUser(null);
    navigate('/'); // Redirect ke login
  };

  useEffect(() => {
    if (activeMenu === 'kelolaMentor') {
      const fetchPendingTeachersData = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = await fetchPendingTeachers(token);
            setPendingTeachers(data);
        } catch (error) {
            console.error('Error:', error);
        }
      };
      fetchPendingTeachersData();
    }
    if (activeMenu === 'forumTentor') {
      const fetchTeacherForums = async () => {
        try {
          const token = localStorage.getItem('token');
          const data = await fetchForumsByTeacherId(user?.id, token);;
          setTeacherForums(data); // Store the fetched forums
        } catch (error) {
          console.error('Error fetching forums:', error);
        }
      };
      fetchTeacherForums();
    }
}, [activeMenu, user?.id]); // Hanya fetch ulang jika activeMenu berubah

const handleApprove = async (teacherId) => {
  try {
    await approveTeacher(teacherId, localStorage.getItem('token'));
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
    await rejectTeacher(teacherId, localStorage.getItem('token'));
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
            {forums.map((forum) => (
              <Forum key={forum.id} forum={forum} />
            ))}
          </div>
        );
      case 'forumSaya':
        return (
          <div className="grid grid-cols-3 gap-6">
            {forumsHistory.map((forum) => (
              <MyForum key={forum.id} forum={forum} />
            ))}
 
          </div>    
          );
      case 'forumTentor':
        return (
          <div>
             {teacherForums.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                    <p>Anda belum memiliki forum.</p>
                </div>
            ) : (
          <div className="grid grid-cols-3 gap-6">
            {teacherForums.map((teacherForum) => (
              <MyForum key={teacherForum.id} forum={teacherForum} />
            ))}
            <div className="flex justify-between items-center mt-auto">
              <CreateForum />
            </div>
          </div>
            )}
          </div>
        );
      case 'transaksi':
        return (
          <div className="grid grid-cols-3 gap-6">
            {historyCheckout.slice().reverse().map((forum) => (
              <HistoryCheckout key={forum.id} forum={forum} />
            ))}
          </div>
        );
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
          {user?.role !== 'teacher' && (
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
          )}
          {/* Forum Saya */}
          {user?.role === 'student' && (
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

          {/* Forum Saya Tentor*/}
          {user?.role === 'teacher' && (
          <button
            className={`w-full flex justify-center py-2 rounded-lg ${
              activeMenu === 'forumTentor' ? 'bg-[#FFA726]' : 'bg-white'
            }`}
            onClick={() => setActiveMenu('forumTentor')}
          >
            <img
              src={activeMenu === 'forumTentor' ? ForumSayaAktif : ForumSayaInactive}
              alt="Forum Saya Tentor"
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
