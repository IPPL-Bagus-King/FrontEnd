import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchForums, fetchTeacher, fetchRating,  fetchCheckout, fetchMaterial, deleteMaterial } from '../services/apiService';
import Backbutton from '../assets/ButtonKembali.png';
import Join from '../assets/JoinButton.png';
import Trash from '../assets/Trash.png';
import EditForum from '../components/EditForum';
import DeleteForum from '../assets/delete.png';
import UploadMaterial from '../components/UploadMaterial';
import { motion } from 'framer-motion';
import PurchasePopup from './PurchasePopUp'; // Pastikan komponen ini sudah ada
import Swal from 'sweetalert2';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ForumDetail = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [rating, setRating] = useState(null);
  const [material, setMaterial] = useState([]);
  const [relatedForums, setRelatedForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [popupData, setPopupData] = useState({});

  // Checkout state
  const [checkoutData, setCheckoutData] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State untuk popup
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMaterial = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleDaftarClick = (status) => {
    if (status === "settlement") {
      setPopupData({ status: "settlement" });
      setIsPopupVisible(true);
    } else if (status === "pending") {
      setPopupData({
        status: "pending",
        order_id: checkoutData?.data?.order_id,
        bank: checkoutData?.data?.bank,
        va_number: checkoutData?.data?.va_number,
      });
      setIsPopupVisible(true);
    } else {
      setPopupData({ status: "default" });
      setIsPopupVisible(true);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // Fungsi untuk format tanggal dalam bahasa Indonesia
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  };

  const calculateDuration = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    
    const diffInTime = now.getTime() - createdAt.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)); // Menghitung perbedaan dalam hari
    
    if (diffInDays < 31) {
      return `${diffInDays} hari`; // Jika kurang dari 31 hari, tampilkan hari
    }
  
    const diffInMonths = Math.floor(diffInDays / 30.44); // Perkiraan 1 bulan = 30.44 hari
    if (diffInMonths < 12) {
      return `${diffInMonths} bulan`; // Jika kurang dari 12 bulan, tampilkan bulan
    }
  
    const years = Math.floor(diffInMonths / 12);
    const remainingMonths = diffInMonths % 12;
    
    if (remainingMonths === 0) {
      return `${years} tahun`; // Jika bulan sisa 0, tampilkan tahun saja
    }
    
    return `${years} tahun ${remainingMonths} bulan`; // Tampilkan tahun dan sisa bulan
  };

  const handleDeleteMaterial = async (materialId) => {
    // Tampilkan konfirmasi SweetAlert
    await Swal.fire({
      title: "Apakah anda yakin ingin menghapus materi?",
      text: "Anda tidak bisa mengembalikan forum yang sudah dihapus!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: 'custom-ok-button',
      },
      confirmButtonText: "Ya, hapus materi!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMaterial(materialId)
          .then(() => {
            // Tampilkan Swal notifikasi sukses
            Swal.fire({
              title: "Terhapus!",
              text: "Materi berhasil dihapus.",
              icon: 'success',
              customClass: {
                confirmButton: 'custom-ok-button',
              },
            }).then(() => {
              // Reload halaman setelah konfirmasi
              window.location.reload();
            });
          })
          .catch((error) => {
            // Jika terjadi kesalahan saat menghapus materi
            Swal.fire({
              title: "Gagal menghapus!",
              text: "Terjadi kesalahan saat menghapus materi.",
              icon: 'error',
              customClass: {
                confirmButton: 'custom-ok-button',
              },
            });
          });
      }
    });
  };

  useEffect(() => {
    const getForumData = async () => {
      try {
        setLoading(true);

        // Fetch forum data
        const response = await fetchForums();
        const forumData = response.data.find((item) => item.id === Number(id));
        if (!forumData) throw new Error('Forum tidak ditemukan');
        setForum(forumData);

        // Fetch related forums
        const otherForums = response.data.filter((item) => item.id !== Number(id));
        setRelatedForums(otherForums.slice(0, 4));

        // Fetch rating
        const ratingData = await fetchRating(forumData.id);
        setRating(ratingData.averageRating);

        // Fetch teacher
        const teacherData = await fetchTeacher(forumData.teacher_id);
        setTeacher(teacherData.data);

        // Fetch checkout data
        const checkoutResponse = await fetchCheckout(forumData.id);
        setCheckoutData(checkoutResponse);

        // Fetch material
        const materialResponse = await fetchMaterial(forumData.id);
        setMaterial(materialResponse.data);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getForumData();
    
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Loading Spinner */}
        <div className="animate-spin rounded-full border-t-4 border-[#FFA726] w-16 h-16 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <motion.div
      className="p-6 space-y-4 mt-2" // Butuh margin?
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Forum Image and Header */}
      <div className="relative">
        <img
          src={`${BASE_URL}/${forum.picture}`}
          alt={forum.name}
          className="w-full h-56 object-cover rounded-md shadow-md"
        />
        
        {/* Forum Name on Top of the Image */}
        <div className="absolute bottom-4 left-4 bg-[#FFA726] p-2 rounded-md">
          <h2 className="text-white font-bold text-xl font-poppins">{forum.name}</h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white p-4 rounded-full shadow-md hover:bg-gray-200"
        >
          <img src={Backbutton} alt="Back" className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content with Two Columns */}
      <div className="mt-6 flex gap-6 w-full max-w-screen-lg">
        {/* Left Column */}
        <div className="w-1/4 min-w-[290px] max-w-[300px] space-y-4">
          {/* ID Forum Section */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">ID Forum</h3>
            <p className="mt-2 text-gray-600">{forum.id}</p>
          </div>

          
          {/* Harga Section */}
          {user?.role === 'student' && (
          <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-start">
            <div>
              <h3 className="text-xl font-semibold">Harga</h3>
              <p className="mt-2 text-gray-600">
                Rp. {new Intl.NumberFormat('id-ID', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(forum.price || 0)}
              </p>
            </div>
            <div className="grid justify-items-end">
              <button
                onClick={() => {
                  if (checkoutData?.data?.status === "settlement") {
                    handleDaftarClick("settlement");
                  } else if (checkoutData?.data?.status === "pending") {
                    handleDaftarClick("pending");
                  } else {
                    handleDaftarClick("default");
                  }
                }}
                className={`mt-4 py-1 px-3 rounded-md text-white text-sm font-poppins transform transition-all hover:scale-105 ${
                  checkoutData?.data?.status === "settlement"
                    ? "bg-[#5cb85c] cursor-pointer"
                    : checkoutData?.data?.status === "pending"
                    ? "bg-[#fcd53f] cursor-pointer"
                    : "bg-[#FFA726] hover:bg-[#FF9800] cursor-pointer"
                }`}
              >
                {checkoutData?.data?.status === "settlement"
                  ? "Telah Bergabung"
                  : checkoutData?.data?.status === "pending"
                  ? "Menunggu Pembayaran"
                  : "Daftar Sekarang"}
              </button>
            </div>
          </div>
          )}


          <div>
            {/* Tampilkan popup */}
            {isPopupVisible && (
             
             <PurchasePopup
                forum={forum}
                isOpen={isPopupVisible}
                onClose={closePopup}
                popupData={popupData}
              />
            )}
          </div>

          {/* List Materi */}
          {/* <div className="bg-white p-4 rounded-md shadow-md flex-grow">
            <h3 className="text-xl font-semibold">List Materi</h3>
            <p className="mt-2 text-gray-400">{forum.materi || 'Materi belum tersedia'}</p>
          </div> */}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-6">
          {/* Pengajar Detail */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Data Pengajar</h3>
            <div className="flex items-center space-x-4 mt-4">
              <div className="w-28 h-28 bg-gray-300 rounded-full">
                <img
                  src={`${BASE_URL}/${teacher.picture}`}
                  alt={teacher.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-lg font-medium">{teacher.username || 'N/A'}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">HP: </span>{teacher.phone_number || 'Deskripsi tidak tersedia'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Email: </span>{teacher.email || 'Deskripsi tidak tersedia'}
                  </p>
                </div>
                {/* Format tanggal bergabung */}
                <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Bergabung sejak: </span>
                    {formatDate(teacher.created_at)} ({calculateDuration(teacher.created_at)})
                  </p>
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-yellow-400">
                    ⭐ {rating || '0.0'}/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Forum Description */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold">Deskripsi Forum</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {forum.description || 'Deskripsi tidak tersedia'}
              </p>
            </div>

          {/* List Materi */}
          {/* Tampilkan List Materi hanya jika kondisi terpenuhi */}
          {(checkoutData?.data?.status === "settlement" || user?.role === "teacher") && (
               <div className="bg-white p-4 rounded-md shadow-md">
               <h3 className="text-xl font-semibold mb-4">List Materi</h3>
               {material.length === 0 ? (
                 <p className="text-gray-600 mt-4">Materi belum tersedia.</p>
               ) : (
                 <ul className="space-y-4 mt-4">
                   {material.map((item, index) => (
                     <div key={item.id} className="border rounded-md shadow-sm">
                       {/* Header Materi */}
                       <div
                         className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 rounded-md"
                         onClick={() => toggleMaterial(index)}
                       >
                         <p className="text-lg font-semibold">
                           {index + 1}. {item.title}
                         </p>
                         <span className="text-gray-500">
                           {openIndex === index ? "▲" : "▼"}
                         </span>
                       </div>
         
                       {/* Konten Materi */}
                       {openIndex === index && (
                         <div className="p-4 bg-gray-50 rounded-b-md">
                           <p className="text-gray-600 whitespace-pre-line mb-4">
                             {item.description}
                           </p>
                           <div>
                             <h4 className="text-md font-semibold mb-2">Files:</h4>
                             {item.files && item.files.length > 0 ? (
                               <ul className="list-disc ml-5 space-y-2">
                                 {item.files.map((file) => (
                                   <li key={file.id}>
                                     <a
                                       href={`${BASE_URL}/forum/files/${file.file_url}`}
                                       download
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-orange-500 hover:underline"
                                     >
                                       {file.file_url.split("\\").pop()} {/* Tampilkan judul file saja */}
                                     </a>
                                   </li>
                                 ))}
                               </ul>
                             ) : (
                               <p className="text-sm text-gray-500">No files available</p>
                             )}
                           </div>
                         </div>
                       )}
         
                       {/* Tombol Hapus (hanya untuk role "teacher") */}
                       {user?.role === "teacher" && (
                         <div className="flex justify-end p-4">
                           <motion.img
                             src={DeleteForum}
                             alt="Delete Button"
                             onClick={() => handleDeleteMaterial(item.id)}
                             className="w-24 cursor-pointer rounded-full shadow-md hover:bg-red-600 "
                             whileHover={{ scale: 1.1 }}
                           />
                         </div>
                       )}
                     </div>
                   ))}
                 </ul>
               )}
             </div>
          )}

          {/* Recommended Forums */}
          <div className="bg-white p-4 rounded-md shadow-md max-w-screen-xl mx-auto overflow-hidden">
            <h3 className="text-xl font-semibold">Forum Lainnya</h3>
            <div className="flex space-x-4 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory p-4">
              {relatedForums.length > 0 ? (
                relatedForums.map((relatedForum) => (
                  <motion.div
                    key={relatedForum.id}
                    className="flex-shrink-0 w-96 p-4 bg-gray-100 rounded-md shadow-md relative snap-center"
                    whileHover={{ scale: 1.05 }} // Hover animation
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <img
                      src={`${BASE_URL}${relatedForum.picture}`}
                      alt={relatedForum.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-medium text-gray-800">{relatedForum.name}</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {relatedForum.description.substring(0, 50)}...
                    </p>
                    <button
                      onClick={() => navigate(`/forum/${relatedForum.id}`)}
                      className="absolute bottom-4 right-4 transform transition-all hover:scale-110"
                    >
                      <img
                        src={Join}
                        alt="Join"
                        className="w-16 h-auto"
                      />
                    </button>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400">Tidak ada forum terkait</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Edit Forum */}
      {user?.role === 'teacher' && (  
      <div className="flex justify-between items-center mt-auto">
          <UploadMaterial forumId={forum.id} />
          <EditForum forumId={forum.id}/>
      </div>
      )}
    </motion.div>
  );
};

export default ForumDetail;
