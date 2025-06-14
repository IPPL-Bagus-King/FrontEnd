import React, { useState, useEffect } from 'react';
import Modal from './ModalForm'; // Modal yang ada di sistem Anda
import {
  fetchForums,
  fetchTeacher,
  fetchRating,
  fetchCheckout,
} from '../services/apiService';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PurchasePopup = ({ forum, isOpen, onClose, popupData }) => {
  const [bank, setBank] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [teacher, setTeacher] = useState(null);
  const [rating, setRating] = useState(null);
  const [isPurchaseButtonVisible, setIsPurchaseButtonVisible] = useState(true);

  // Fetch teacher and rating data when the component is mounted or when the forum changes
  useEffect(() => {
    const fetchData = async () => {
      if (forum) {
        try {
          // Fetch rating
          const ratingData = await fetchRating(forum.id);
          setRating(ratingData.averageRating);

          // Fetch teacher
          const teacherData = await fetchTeacher(forum.teacher_id);
          setTeacher(teacherData.data);

          forum.teacher_name = teacherData.data.username;
          forum.rating = ratingData.averageRating;
        } catch (error) {
          console.error('Failed to fetch teacher or rating data', error);
        }
      }
    };
    fetchData();
  }, [forum]);

  // Fungsi untuk memproses pembelian
  const handlePurchase = (e) => {
    e.preventDefault();
    setModalContent(
      `Are you sure you want to purchase the course "${
        forum.name
      }" for Rp ${parseFloat(forum.price).toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} with ${bank}?`
    );
    setIsModalOpen(true);
  };

  // Fungsi untuk konfirmasi pembelian
  const confirmPurchase = async () => {
    try {
      const response = await fetch(`${BASE_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        setModalContent('Failed to process your purchase. Please try again.');
        setIsPurchaseButtonVisible(false);
      }
    } catch (error) {
      setModalContent('Something went wrong. Please try again later.');
      setIsPurchaseButtonVisible(false);
    } finally {
      setIsModalOpen(true);
    }
  };
  return (
    <div>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black flex items-center justify-center z-30'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='bg-white rounded-lg shadow-lg w-[600px] p-6 animate-fadeIn relative'>
            {popupData.status === 'settlement' ? (
              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold text-green-600 mb-4'>
                  Forum Terdaftar! 🎉
                </h2>
                <p className='text-gray-600'>
                  Kamu sudah berhasil mendaftar pada forum:
                </p>
                <div className='bg-gray-50 p-4 rounded-lg shadow space-y-2'>
                  <p className='text-lg font-bold text-gray-800'>
                    {forum.name}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Instructor:</span>{' '}
                    {forum.teacher_name}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Description:</span>{' '}
                    {forum.description}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Rating:</span> {forum.rating}
                    ⭐
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Price:</span> Rp{' '}
                    {parseFloat(forum.price).toLocaleString('id-ID', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className='w-full bg-green-600 text-white font-medium py-3 rounded-lg shadow hover:bg-green-700 transition duration-300'
                >
                  Mulai Belajar
                </button>
              </div>
            ) : popupData.status === 'pending' ? (
              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold text-[#ffa726]'>
                  Menunggu Pembayaran ⚠️
                </h2>
                <p className='text-gray-600'>
                  Kamu belum melakukan pembayaran, silahkan lakukan pembayaran
                  untuk mengakses forum:
                </p>
                <div className='bg-gray-50 p-4 rounded-lg shadow space-y-3 border border-gray-200'>
                  <p className='text-lg font-bold text-gray-800'>
                    {forum.name}
                  </p>
                  <div className='text-gray-700'>
                    <p>
                      <span className='font-medium'>Order ID:</span>{' '}
                      {popupData.order_id}
                    </p>
                    <p>
                      <span className='font-medium'>Bank:</span>{' '}
                      {popupData.bank}
                    </p>
                    <p>
                      <span className='font-medium'>Virtual Account:</span>{' '}
                      <span className='text-blue-600 font-bold'>
                        {popupData.va_number}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className='w-full bg-[#ffa726] text-white font-medium py-3 rounded-lg shadow hover:bg-[#ff9c1a] transition duration-300'
                >
                  Selesaikan Pembayaran
                </button>
              </div>
            ) : (
              <div className='space-y-6'>
                <h2 className='text-2xl font-semibold text-blue-600 mb-4'>
                  Buy this Forum 💡
                </h2>
                <div className='bg-gray-50 p-4 rounded-lg shadow space-y-2'>
                  <p className='text-lg font-bold text-gray-800'>
                    {forum.name}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Instructor:</span>{' '}
                    {forum.teacher_name}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Description:</span>{' '}
                    {forum.description}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Rating:</span> {forum.rating}
                    ⭐
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-medium'>Price:</span> Rp{' '}
                    {parseFloat(forum.price).toLocaleString('id-ID', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <form onSubmit={handlePurchase} className='space-y-4'>
                  <div>
                    <label
                      htmlFor='bank'
                      className='block text-gray-700 font-medium'
                    >
                      Select Bank
                    </label>
                    <select
                      id='bank'
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      required
                      className='w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='' disabled>
                        Choose a Virtual Account Bank
                      </option>
                      <option value='BCA'>BCA</option>
                      <option value='BRI'>BRI</option>
                      <option value='BNI'>BNI</option>
                      <option value='CIMB'>CIMB</option>
                    </select>
                  </div>
                  <button
                    type='submit'
                    disabled={!bank}
                    onClick={() => setIsPurchaseButtonVisible(true)}
                    className={`w-full ${
                      !bank ? 'bg-gray-400' : 'bg-blue-600'
                    } text-white font-medium py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300`}
                  >
                    Purchase
                  </button>
                </form>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => {
                    window.location.reload();
                  }}
                  title='Purchase Confirmation'
                >
                  <p>{modalContent}</p>
                  <div className='mt-4 flex justify-end'>
                    {isPurchaseButtonVisible && (
                      <>
                        <button
                          onClick={() => window.location.reload()}
                          className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400'
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            confirmPurchase();
                          }}
                          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
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
              onClick={onClose}
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-300 text-2xl w-10 h-10 flex items-center justify-center'
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasePopup;
