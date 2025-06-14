import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './ModalForm';
import Pencil from '../assets/pencil.png';
import { editForum, fetchForumById } from '../services/apiService';

const EditForum = ({ forumId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  }); // State untuk form data
  const [originalData, setOriginalData] = useState(null); // State untuk menyimpan data asli
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(''); // State untuk error

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setError(''); // Reset error
    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      const forum = await fetchForumById(forumId, token); // Panggil API untuk mendapatkan data forum
      setOriginalData(forum.data); // Simpan data asli
      setFormData({
        name: forum.data.name || '',
        description: forum.data.description || '',
        price: forum.data.price || '',
      });
    } catch (error) {
      console.error('Error fetching forum data:', error);
      setError('Gagal memuat data forum. Silakan coba lagi.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      price: '',
    });
    setOriginalData(null); // Reset data asli
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Cek apakah data berubah
    if (
      originalData &&
      formData.name === originalData.name &&
      formData.description === originalData.description &&
      formData.price === originalData.price
    ) {
      setError('Tidak ada perubahan yang dilakukan.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      await editForum(forumId, formData, token); // Panggil API untuk edit forum
      handleCloseModal(); // Tutup modal
      window.location.reload(); // Reload halaman
    } catch (error) {
      console.error('Error editing forum:', error);
      setError('Gagal merubah forum. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Edit Button */}
      <motion.img
        src={Pencil}
        alt='Edit Button'
        onClick={handleOpenModal}
        className='w-20 cursor-pointer fixed bottom-10 right-10 z-50 bg-[#FFA726] p-4 rounded-full shadow-md hover:bg-[#FF9800]'
        whileHover={{ scale: 1.07 }}
        style={{
          width: '70px',
        }}
      />

      {/* Modal Popup */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title='Edit Forum'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Nama Forum
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Nama Forum'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Deskripsi Forum
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Deskripsi Forum'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700'
            >
              Harga Forum
            </label>
            <input
              type='number'
              id='price'
              name='price'
              min='1'
              value={formData.price}
              onChange={handleChange}
              placeholder='Harga Forum'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            />
          </div>
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={handleCloseModal}
              className='text-gray-500 hover:text-gray-700 transition duration-300 px-4 py-2'
            >
              Batal
            </button>
            <button
              type='submit'
              className={`${
                loading ? 'bg-gray-400' : 'bg-[#ffa726]'
              } text-white hover:bg-[#ffb951] transition duration-300 px-4 py-2 rounded-md ml-2`}
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditForum;
