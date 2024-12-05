import React, { useEffect, useState } from 'react';
import Join from '../assets/JoinButton.png'; // Gambar button Join
import './Forum.css'; // Import file CSS

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Forum = ({ forum }) => {
  const [popupData, setPopupData] = useState(null); // State untuk pop-up
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State untuk visibility pop-up

  const handleJoinClick = async () => {
    try {
      const response = await fetch(`${BASE_URL}/checkout/check-purchase/${forum.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.data === 'settlement' || data.data === 'pending') {
        setPopupData(data); // Simpan data hasil fetch
      } else {
        setPopupData({ status: 'not_found' }); // Jika tidak ditemukan
      }
      setIsPopupVisible(true); // Tampilkan pop-up
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }
  };

  const closePopup = () => setIsPopupVisible(false);
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
        <img 
          src={Join} 
          alt="Join Button" 
          className="w-20 mr-3 mb-3 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          onClick={handleJoinClick}
        />
      </div>

      {/* Pop-up */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            {popupData.data === 'settlement' ? (
              <p>You already purchased this forum. Enjoy learning!</p>
            ) : popupData.data === 'pending' ? (
              <p>Your payment is still pending. Please complete the payment.</p>
            ) : (
              <form>
                <h2>Buy this forum</h2>
                <button type="submit">Purchase</button>
              </form>
            )}
            <button onClick={closePopup} className="popup-close">Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Forum;
