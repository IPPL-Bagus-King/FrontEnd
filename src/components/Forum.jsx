import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Join from '../assets/JoinButton.png'; // Gambar button Join
import './Forum.css'; // Import file CSS
import Modal from './ModalForm';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Forum = ({ forum }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const [bank, setBank] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isPurchaseButtonVisible, setIsPurchaseButtonVisible] = useState(true);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setModalContent(
      `Are you sure you want to purchase the course "${forum.name}" for Rp ${parseFloat(forum.price).toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})} with ${bank}?`
    );
    setIsModalOpen(true);
  };

  const confirmPurchase = async () => {
    try {
      const response = await fetch(`${BASE_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        
        body: JSON.stringify({
          id_product: forum.id,
          bank: bank,
        }),
      });

      if (response.ok) {
        const paymentDetails = await response.json();
        console.log(paymentDetails);  
        setModalContent(
          `Purchase successful! Please complete your payment. ${bank} Virtual Account: ${paymentDetails.data.va_number}`
        );
        setIsPurchaseButtonVisible(false);
      } else {
        setModalContent("Failed to process your purchase. Please try again.");
        setIsPurchaseButtonVisible(false);
      }
    } catch (error) {
      setModalContent("Something went wrong. Please try again later.");
      setIsPurchaseButtonVisible(false);
    } finally {
      setIsModalOpen(true);
    }
  };

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
      console.log("Response checkout:", data.status);
      // Cek status pembelian dan buka pop-up dengan data yang sesuai
      if (data.data.status === 'settlement' || data.data.status === 'pending') {
        handleOpenPopup(data.data); // Menggunakan openPopup untuk menyimpan data dan menampilkan pop-up
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
            className="course-title text-md font-semibold truncate"
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
        <p className="text-md mb-2">Rp {parseFloat(forum.price).toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})} / meet</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-gray-600 text-md flex items-center">
            <img src={`${BASE_URL}/${forum.teacher_picture}`} alt="Instructor photo" className="w-9 mr-2" />
            {forum.teacher_name}
          </p>
          <div className="flex space-x-2">
          <Link to={`/forum/${forum.id}`}>
          <button 
            className="w-20 h-9 bg-[#ffa726] text-white rounded-full flex justify-center items-center duration-300 transform hover:scale-105 font-semibold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Detail
          </button>
        </Link>
            <img 
              src={Join} 
              alt="Join Button" 
              className="w-20 mr-3 mb-3 duration-300 transform hover:scale-105"
              onClick={handleJoinClick}
            />
            
          </div>
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
                    <span className="font-medium">Price:</span> Rp {parseFloat(forum.price).toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})} / Meet
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Rating:</span> {forum.rating} ⭐
                  </p>
                </div>
                <Link to={`/forum/${forum.id}`}>
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
                      <span className="font-medium">Price:</span> Rp {parseFloat(forum.price).toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})} / Meet
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
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  Buy this Forum 💡
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow space-y-2">
                  <p className="text-lg font-bold text-gray-800">{forum.name}</p>
                  <p className="text-gray-700">
                    <span className="font-medium">Instructor:</span> {forum.teacher_name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Description:</span> {forum.description}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Rating:</span> {forum.rating} ⭐
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Price:</span> Rp{" "}
                    {parseFloat(forum.price).toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </p>
                </div>
                <form onSubmit={handlePurchase} className="space-y-4">
                  <div>
                    <label htmlFor="bank" className="block text-gray-700 font-medium">
                      Select Bank
                    </label>
                    <select
                      id="bank"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Choose a Virtual Account Bank
                      </option>
                      <option value="BCA">BCA</option>
                      <option value="BRI">BRI</option>
                      <option value="BNI">BNI</option>
                      <option value="CIMB">CIMB</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    onClick={() => setIsPurchaseButtonVisible(true)}
                    className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                  >
                    Purchase
                  </button>
                </form>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => {
                    window.location.reload();
                  }}              
                  title="Purchase Confirmation"
                >
                  <p>{modalContent}</p>
                    <div className="mt-4 flex justify-end">
                      {isPurchaseButtonVisible && (
                        <>
                          <button
                            onClick={() => window.location.reload()}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              confirmPurchase();
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Confirm
                          </button>
                        </>
                      )}
                    </div>
                </Modal>            
              </div>
            )}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
