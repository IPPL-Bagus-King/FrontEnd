import React, { useState } from 'react';
import ModalForm from './ModalForm';
import Upload from '../assets/UploadButton.png';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { uploadMaterial } from '../services/apiService';

const UploadMaterial = ({ forumId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(''); // State untuk pesan error

  // Handle drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    if (!files.length || !title.trim()) {
      setError('Judul dan minimal harus ada 1 file untuk di upload!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description); // Optional
    files.forEach((file) => formData.append('files', file));

    try {
      setLoading(true);
      setError(''); // Reset error sebelum proses dimulai
      const token = localStorage.getItem('token');
      await uploadMaterial(forumId, formData, token);
      
      // Tampilkan Swal notifikasi sukses
      Swal.fire({
        title: "Upload Berhasil!",
        text: "Materi berhasil diupload.",
        icon: 'success',
        customClass: {
          confirmButton: 'custom-ok-button',
        },
      }).then(() => {
        // Reload halaman setelah konfirmasi
        window.location.reload();
      });
    } catch (error) {
      // Tangani kesalahan dan set error message
      setError(error?.response?.data?.message || 'Terjadi kesalahan saat mengupload materi.');
    } finally {
      setLoading(false);
    }
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setFiles([]);
    setTitle('');
    setDescription('');
    setError(''); // Reset error saat modal ditutup
  };

  return (
    <>
      <motion.img
        src={Upload}
        alt="Upload Button"
        onClick={() => setIsModalOpen(true)}
        className="w-20 cursor-pointer fixed bottom-32 right-10 z-50 bg-[#FFA726] p-4 rounded-full shadow-md hover:bg-[#FF9800]"
        whileHover={{ scale: 1.07 }}
      />

      {isModalOpen && (
        <ModalForm
          isOpen={isModalOpen}
          onClose={closeAndResetModal}
          title="Upload Materi"
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Judul
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div
              className={`border-2 rounded-md p-4 text-center transition-all ${
                dragging
                  ? 'border-dashed border-orange-500 bg-orange-50'
                  : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {files.length > 0 ? (
                <p className="text-sm text-gray-600">
                  {files.map((file) => file.name).join(', ')}
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Drag and drop files here or{' '}
                  <label
                    htmlFor="files"
                    className="text-[#ffa726] cursor-pointer"
                  >
                    browse
                  </label>
                </p>
              )}
              <input
                type="file"
                id="files"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 mt-2">
                {error}
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeAndResetModal}
                className="text-gray-500 hover:text-gray-700 transition duration-300 px-4 py-2"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-md shadow-md text-white transition-all duration-300 ${
                  loading ? 'bg-gray-400' : 'bg-[#ffa726] hover:bg-[#ffb951]'
                }`}
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </ModalForm>
      )}
    </>
  );
};

export default UploadMaterial;
