import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './ModalForm';
import LogoAdd from '../assets/LogoAdd.png';
import { createForum } from '../services/apiService';


const CreateForum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  }); // State untuk form data
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(''); // State untuk error

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      price: '',
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      const result = await createForum(formData, token); // Panggil createForum dari apiService

      // Tutup modal dan reset form setelah sukses
      setIsModalOpen(false);
      setFormData({
        name: '',
        description: '',
        price: '',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error creating forum:', error);
      setError('Gagal membuat forum. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Add Button */}
      <motion.img
        src={LogoAdd}
        alt="Add Button"
        onClick={handleOpenModal}
        className="w-20 cursor-pointer fixed bottom-10 right-10 z-50"
        whileHover={{ scale: 1.07 }}
        />

      {/* Modal Popup */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Buat Forum">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Kelas
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Kelas"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Deskripsi Forum
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi Forum"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Harga Forum
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Harga Forum"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 transition duration-300 px-4 py-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`${
                loading ? 'bg-gray-400' : 'bg-orange-500'
              } text-white hover:bg-orange-600 transition duration-300 px-4 py-2 rounded-md ml-2`}
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

export default CreateForum;
