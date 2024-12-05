import React, { useEffect, useState } from 'react';
import Join from '../assets/JoinButton.png'; // Gambar button Join
import Selesai from '../assets/Selesai.png'; // Gambar button Selesai
import BelumBayar from '../assets/BelumBayar.png'; // Gambar button Belum Bayar
import './Forum.css'; // Import file CSS

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Forum = ({ forum }) => {
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
          src={forum.status === 'settlement' ? Selesai : BelumBayar} 
          alt={forum.status === 'settlement' ? "Settlement Button" : "Pending Button"} 
          className="w-21 mr-3 mb-3 transition-all duration-300 transform cursor-pointer hover:scale-105"
          onClick={() => alert('Join Button Clicked')}
        />
      </div>
    </div>
  );
};

export default Forum;
