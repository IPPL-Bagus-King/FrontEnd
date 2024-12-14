import React from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Komponen HistoryCheckoutTeacher
const HistoryCheckoutTeacher = ({ forum }) => {
  const { user, forum: forumDetails, createdAt, bank } = forum;

  // Format tanggal checkout
  const checkoutDate = new Date(createdAt);
  const formattedDate = checkoutDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs">
      {/* Gambar user */}
      <div className="flex items-center space-x-4 border-b pb-4 mb-4">
        <img
          src={`${BASE_URL}/${user.picture}`}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Detail Forum */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Id Forum:</span> {forum.id}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Forum Name:</span> {forumDetails.name}
        </p>
      </div>

      {/* Payment and Checkout Info */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Payment:</span> {bank}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Checkout in:</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default HistoryCheckoutTeacher;