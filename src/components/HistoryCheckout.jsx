import React, { useEffect, useState } from 'react';
import Selesai from '../assets/Selesai.png'; // Gambar button Selesai
import BelumBayar from '../assets/BelumBayar.png'; // Gambar button Belum Bayar
import { Link } from 'react-router-dom';
import './Forum.css'; // Import file CSS

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Forum = ({ forum }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const openPopup = (data) => {
    setPopupData(data);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupData(null);
  };

  const handleOpenPopup = (data) => {
    openPopup(data);
  };

  const handleClick = async () => {
    try {
      if (forum.status === 'settlement' || forum.status === 'pending') {
        handleOpenPopup(forum); // Menggunakan openPopup untuk menyimpan data dan menampilkan pop-up
      } else {
        handleOpenPopup({ status: 'not_found' }); // Jika forum tidak ditemukan, tampilkan pop-up dengan status not_found
      }
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }

  };
  return (
    <div>
     <div className="course-card border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-4 flex flex-col" style={{ aspectRatio: '6/5' }}>
        <img src={`${BASE_URL}/${forum.picture}`} alt={forum.name} className="w-full h-40 object-cover rounded-lg mb-4 transform transition-all duration-500 ease-in-out" />
        <div className="flex justify-between items-center mb-2">
          <h2 
          className="course-title"
          style={{ 
            maxWidth: '80%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          >
            {forum.name}
          </h2>
          <p className="text-yellow-500 text-sm text-lg">{forum.rating} ⭐</p>
        </div>
        <p className="text-md mb-2">{forum.price} / meet</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-gray-600 text-md flex items-center">
            <img src={`${BASE_URL}/${forum.teacher_picture}`} alt="Instructor photo" className="w-9 mr-2" />
            {forum.teacher_name}
          </p>
          <img 
            src={forum.status === 'settlement' ? Selesai : BelumBayar} 
            alt={forum.status === 'settlement' ? "Settlement Button" : "Pending Button"} 
            className="w-21 mr-3 mb-3 transition-all duration-300 transform cursor-pointer hover:scale-105"
            onClick={handleClick}
          />
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-30" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 animate-fadeIn relative">
            {/* Conditional Content */}
            {popupData.status === 'settlement' ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">
                  Purchase Confirmed! 🎉
                </h2>
                <p className="text-gray-600">
                  You already purchased this forum. Enjoy learning! Here are the details of the course:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg shadow space-y-2">
                  <p className="text-lg font-bold text-gray-800">
                    {forum.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Instructor:</span> {forum.teacher_name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Description:</span> {forum.description}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Price:</span> {forum.price} / Meet
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Rating:</span> {forum.rating} ⭐
                  </p>
                </div>
                <Link to={`/forum/${forum.id_forum}`}>
                  <button
                    className="w-full bg-green-600 text-white font-medium py-3 rounded-lg shadow hover:bg-green-700 transition duration-300"
                  >
                    Go to Forum
                  </button>
                </Link>
              </div>            
            ) : popupData.status === 'pending' ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-yellow-600">
                  Payment Pending ⚠️
                </h2>
                <p className="text-gray-600">
                  Your payment is still pending. Please complete the payment to access the forum. Here are the details of the payment:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg shadow space-y-3 border border-gray-200">
                  <p className="text-lg font-bold text-gray-800">
                    {forum.name}
                  </p>
                  <div className="text-gray-700">
                    <p>
                      <span className="font-medium">Order ID:</span> {popupData.order_id}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {popupData.status}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> {forum.price} / Meet
                    </p>
                    <p>
                      <span className="font-medium">Bank:</span> {popupData.bank}
                    </p>
                    <p>
                      <span className="font-medium">Virtual Account:</span>{" "}
                      <span className="text-blue-600 font-bold">{popupData.va_number}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {window.location.reload()}} // Replace with your function to handle payment
                  className="w-full bg-yellow-600 text-white font-medium py-3 rounded-lg shadow hover:bg-yellow-700 transition duration-300"
                >
                  Complete Payment
                </button>
              </div>
            ) : (
              null
            )}

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-300 text-2xl w-10 h-10 flex items-center justify-center"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  
  );
};

export default Forum;
