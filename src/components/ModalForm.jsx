const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
          <div className="text-gray-600">{children}</div>
          <button
            onClick={onClose}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition duration-300 text-xl w-10 h-10 flex items-center justify-center"
          >
            ✖
          </button>
        </div>
      </div>
    );
  };

export default Modal;