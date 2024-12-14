import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { deleteForum } from '../services/apiService'; // Import fungsi deleteForum
import DetailKelas from '../assets/detailkelas.png';
import Trash from '../assets/Trash.png';
import './Forum.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Forum = ({ forum }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus forum?",
      text: "Anda tidak bisa mengembalikan forum yang sudah dihapus!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: 'custom-ok-button',
      },
      confirmButtonText: "Ya, hapus forum!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil fungsi deleteForum untuk menghapus forum
        const token = localStorage.getItem('token');
        deleteForum(forum.id, token)
          .then(() => {
            // Tampilkan Swal notifikasi sukses
            Swal.fire({
              title: "Terhapus!",
              text: "Forum berhasil dihapus.",
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
            // Jika terjadi kesalahan saat menghapus forum
            Swal.fire({
              title: "Gagal menghapus!",
              text: "Terjadi kesalahan saat menghapus forum.",
              icon: 'error',
              customClass: {
                confirmButton: 'custom-ok-button',
              },
            });
          });
      }
    });
  };

  return (
    <div className="course-card border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-4 flex flex-col" style={{ aspectRatio: '6/5' }}>
      <img src={`${BASE_URL}/${forum.picture}`} alt={forum.name} className="w-full h-40 object-cover rounded-lg mb-4 transform transition-all duration-500 ease-in-out" />
      <div className="flex justify-between items-center mb-2">
        <h2 className="course-title">{forum.name}</h2>
        <p className="text-yellow-500 text-sm text-lg">{forum.rating} ⭐</p>
      </div>
      <p className="text-md mb-2">Rp {forum.price} / meet</p>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-gray-600 text-md flex items-center">
          <img src={`${BASE_URL}/${forum.teacher_picture}`} alt="Instructor photo" className="w-9 mr-2" />
          {forum.teacher_name}
        </p>
        <div className="flex items-center">
        {user?.role === 'teacher' && (
          <motion.img
            src={Trash}
            alt="Delete Button"
            onClick={handleDelete}
            className="w-12 cursor-pointer bg-red-500 p-3 rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          />
        )}
          <Link to={`/forum/${forum.id}`}>
            <img 
              src={DetailKelas} 
              alt="Detail kelas Button" 
              className="w-21 ml-3 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forum;
