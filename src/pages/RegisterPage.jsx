import React, { useState } from "react";
import { registerUser } from "../services/apiService";
import LogoOrange from "../assets/logo-Orange.png";
import LoginIllustration from "../assets/LoginIlus.png";
import Mentor from "../assets/mentor.png";
import Tentor from "../assets/tentor.png";
import MentorOrange from "../assets/Mentor-Orange.png";
import TentorWhite from "../assets/Tentor-White.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [isMentor, setIsMentor] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    role: "teacher",
  });
  const [formKey, setFormKey] = useState(0); // Key to trigger form reanimation

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (mentor) => {
    setIsMentor(mentor);
    setFormData((prev) => ({
      ...prev,
      role: mentor ? "teacher" : "student",
    }));
    setFormKey(prevKey => prevKey + 1); // Trigger form reanimation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      Swal.fire({
        title: "Registrasi Berhasil!",
        text: "Silahkan login untuk melanjutkan",
        icon: "success",
        //color: "#FFA726",
        customClass: {
          confirmButton: "custom-ok-button", // Tambahkan kelas kustom
        },
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Registrasi Gagal!",
        text: "Silahkan coba lagi",
        icon: "error",
        //color: "#FFA726",
        customClass: {
          confirmButton: "custom-ok-button", // Tambahkan kelas kustom
        },
      });
    }
  };

  return (
    <motion.div
      className="flex min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <a href="/">
        <img
          src={LogoOrange}
          alt="Logo"
          className="absolute top-10 left-10"
          style={{ width: "154.5px", height: "44.25px" }}
        />
      </a>
      <div
        className="flex flex-col items-center justify-center w-1/2"
        style={{ backgroundColor: "#FFF6E9" }}
      >
        <motion.img
          src={LoginIllustration}
          alt="Illustration"
          style={{ width: "558px", height: "350px" }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <motion.div
        className="flex flex-col justify-center items-center w-1/2 bg-white p-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Membuat Akun</h1>
        <motion.div
          className="flex space-x-4 mb-8 justify-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            className={`flex items-center ${
              isMentor
                ? "bg-[#FFA726] text-white border-none"
                : "bg-white text-[#FFA726] border-2 border-[#FFA726]"
            } px-8 py-2 rounded-md`}
            onClick={() => handleRoleChange(true)}
          >
            <img
              src={isMentor ? Mentor : MentorOrange}
              alt="Mentor"
              className="h-5 w-5"
            />
            Mentor
          </button>
          <button
            className={`flex items-center ${
              !isMentor
                ? "bg-[#FFA726] text-white border-none"
                : "bg-white text-[#FFA726] border-2 border-[#FFA726]"
            } px-8 py-2 rounded-md`}
            onClick={() => handleRoleChange(false)}
          >
            <img
              src={isMentor ? Tentor : TentorWhite}
              alt="Tentor"
              className="h-5 w-5"
            />
            Tentor
          </button>
        </motion.div>
        <motion.form
          className="space-y-4 w-1/2"
          onSubmit={handleSubmit}
          key={formKey} // Key to force re-render of the form and animate
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{ border: "none", fontSize: "13px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{ border: "none", fontSize: "13px" }}
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Nomor Handphone"
            value={formData.phone_number}
            onChange={handleChange}
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{ border: "none", fontSize: "13px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full px-4 py-2.5 rounded-md mx-auto bg-[#efefef] text-[#818181] text-sm font-poppins"
            required
            style={{ border: "none", fontSize: "13px" }}
          />
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-[#FFA726] px-6 py-2 text-white rounded-md text-center flex items-center justify-center text-center"
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                padding: "12px 48px",
              }}
            >
              Daftar
            </button>
          </div>

          {/* Login Akun */}
          <p className="mt-4 text-[#000000] text-center" style={{ fontSize: '11px', fontWeight: '300' }}>
            Sudah punya akun?{" "}
            <a href="/login" className="text-[#000000]" style={{ fontSize: "11px", fontWeight: "1000" }}>
              Login di sini
            </a>
          </p>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
