import React, { useState } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TeacherCard = ({ teacher, onApprove, onReject, setActiveMenu }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState('');

    const handleAction = async() => {
        if (action === 'approve') {
          await onApprove();
        } else if (action === 'reject') {
          await onReject();
        }
        setModalOpen(false);
        setActiveMenu('kelolaMentor');  
    };

    return (
       <div>
        <div className="teacher-card border rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-4 flex flex-col items-center" style={{ aspectRatio: '5/3'}}>
        {/* Avatar */}
        <img
            src={`${BASE_URL}/${teacher.picture}`}
            alt="Teacher Avatar"
            className="w-16 h-16 object-cover rounded-full mb-4"
        />

        {/* Teacher Info */}
        <div className="text-center mb-4">
            <h2 className="text-lg font-semibold">{teacher.name}</h2>
            <p className="text-sm text-gray-400">{teacher.email}</p>
            <p className="text-sm text-gray-400">{teacher.phone_number}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between w-full mt-auto">
            <button
            onClick={() => {
                setAction('approve');
                setModalOpen(true);
              }}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full w-1/2 mr-2 transition-all duration-300"
            >
            Setujui
            </button>
            <button
            onClick={() => {
                setAction('reject');
                setModalOpen(true);
              }}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-1/2 transition-all duration-300"
            >
            Tolak
            </button>
        </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal bg-white border rounded-lg p-4 shadow-lg w-1/3">
              <p>Apakah Anda yakin ingin {action === 'approve' ? 'menyetujui' : 'menolak'} mentor ini?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full mr-2"
                >
                  Batal
                </button>
                <button
                  onClick={handleAction}
                  className={`${
                    action === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  } text-white py-2 px-4 rounded-full`}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
    );
};

export default TeacherCard;
