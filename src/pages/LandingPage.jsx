import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import LogoWhite from '../assets/logo-White.png';
import PeopleImage from '../assets/People.png';
import WaveBG from '../assets/WaveBG.png';

import Logo1 from '../assets/FeatureSection1.png';
import Logo2 from '../assets/FeatureSection2.png';
import Logo3 from '../assets/FeatureSection3.png';
import Logo4 from '../assets/FeatureSection4.png';
import Mail from '../assets/mail.png';
import Instagram from '../assets/instagram.png';
import PrevVector from '../assets/buttonPrevVector.svg';
import NextVector from '../assets/buttonNextVector.svg';
import Search from '../assets/search.png';
import Filter from '../assets/filter.png';
import Kalkulus from '../assets/Kalkulus.png';
import AlgoritmaPemrograman from '../assets/Alpro.png';
import TeoriPeluang from '../assets/TeoriPeluang.png';
import Join from '../assets/JoinButton.png';
import People1 from '../assets/People1.png';
import People2 from '../assets/People2.png';
import People3 from '../assets/People3.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      img: Logo1,
      title: "Menyediakan mentor yang terbaik",
      desc: "Mentor yang disediakan adalah mentor mentor terbaik di bidangnya.",
    },
    {
      img: Logo2,
      title: "Memudahkan tentor dengan waktu fleksibel",
      desc: "Waktu dalam pelaksanaan mentoring dibuat oleh kesepakatan antara tentor dan mentor.",
    },
    {
      img: Logo3,
      title: "Latihan soal untuk persiapan ujian",
      desc: "Melakukan pembahasan soal soal ujian agar tentor lebih paham dan percaya diri dalam mengerjakan ujian nantinya.",
    },
    {
      img: Logo4,
      title: "Memudahkan tentor jika kesulitan memahami tugas rumah",
      desc: "Tentor dapat melakukan konsultasi dengan mentor apabila merasa kesulitan untuk mengerjakan tugas rumahnya.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const buttonNavVariants = {
    hidden: { opacity: 0, y: -10 },  // Navbar mulai dari atas
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const buttonNavVariants2 = {
    hidden: { opacity: 0, y: -10 },  // Navbar mulai dari atas
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.15 } },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },  // Navbar mulai dari atas
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -50 },  // Logo masuk dari kiri
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' } },
  };

  const testimonials = [
    { name: "Emily Davis", review: "Tutor.in has been a game-changer!  The tutors are incredibly knowledgeable and patient. I've made huge strides in my studies, thanks to their guidance. Highly recommended! ⭐ ⭐ ⭐ ⭐ ⭐", image: People1 },
    { name: "Michael Chen", review: "I was struggling with calculus until I found Tutor.in. ➗ The interactive lessons and practice problems have made all the difference. I'm so glad I discovered this platform!", image: People2 },
    { name: "Olivia Rodriguez", review: "Tutor.in is the perfect place to learn at your own pace.  The flexibility is amazing, and the tutors are always available to answer questions. I've learned so much!", image: People3 },
    { name: "Daniel Lee", review: "I've tried other online tutoring platforms, but Tutor.in is by far the best.  The tutors are not only experts in their subjects but also great at explaining things in a way that's easy to understand.", image: People2 },
    { name: "Sophia Patel", review: "I was nervous about taking an online course, but Tutor.in made the transition seamless.  The platform is user-friendly, and the community is supportive. I've made some great friends while learning new skills.", image: People3 },
    { name: "Ethan Kim", review: "Tutor.in has helped me improve my writing skills tremendously.  The feedback from the tutors is invaluable, and I've become a much more confident writer. ", image: People1 },
    { name: "Ava Wilson", review: "I was looking for a way to brush up on my Spanish, and Tutor.in was the perfect solution. 🇪🇸 The native-speaking tutors are amazing, and I've made rapid progress. ¡Gracias!", image: People3 },
    { name: "Benjamin Hall", review: "Tutor.in has been a lifesaver! 🆘 I was struggling to keep up with my coursework, but with the help of a tutor, I'm back on track. I'm so grateful for this resource. ", image: People1 },
    { name: "Charlotte Wright", review: "If you're looking for personalized learning, Tutor.in is the way to go.  The tutors are able to identify your strengths and weaknesses and tailor the lessons accordingly. I'm really impressed with this platform.", image: People2 },
  ];

  useEffect(() => {
    // Set interval untuk mengganti index setiap 7 detik
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex + 3 >= testimonials.length ? 0 : prevIndex + 3;
      });
    }, 7000); // Bergeser setiap 7 detik
  
    return () => clearInterval(interval);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 3
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= testimonials.length ? 0 : prevIndex + 3
    );
  };
  
  // Buat forum belajar
  const courses = [
    {
      title: "Kalkulus",
      image: Kalkulus,
      rating: 4.7,
      price: "45.000",
      instructor: "Lorem Ipsum",
    },
    {
      title: "Algoritma Pemrograman",
      image: AlgoritmaPemrograman,
      rating: 4.9,
      price: "40.000",
      instructor: "Lorem Ipsum",
    },
    {
      title: "Teori Peluang",
      image: TeoriPeluang,
      rating: 5.0,
      price: "45.000",
      instructor: "Lorem Ipsum",
    },
  ];

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };


  return (
    // Main Section dan Feature Section terpisah
    <div className="flex flex-col" style={{ backgroundColor: '#ffffff', fontFamily: 'Poppins, sans-serif' }}>
      {/* Navbar */}
      <motion.nav
      className="flex justify-between items-center px-10 py-5"
      style={{ backgroundColor: '#FFA726' }}
      initial="hidden"
      animate="visible"
      >
        <motion.img
          src={LogoWhite}
          alt="Logo"
          className="h-10 ml-12"
          variants={logoVariants}  // Menambahkan animasi untuk logo
        />
        <div className="flex items-center space-x-3 mr-12">
        <motion.button
          onClick={() => navigate('/register')}
          className="border border-white text-white font-bold px-6 py-2 rounded-full hover:bg-white hover:text-[#FFA726] transition-all"
          variants={buttonNavVariants}  // Menambahkan animasi untuk tombol
        >
          Daftar
        </motion.button>
        <motion.div 
          className="w-px h-8 bg-white"
          variants={navVariants}
        >
        </motion.div>
        <motion.button
          onClick={() => navigate('/login')}
          className="border border-white text-white font-bold px-6 py-2 rounded-full hover:bg-white hover:text-[#FFA726] transition-all"
          variants={buttonNavVariants2}  // Menambahkan animasi untuk tombol
        >
          Masuk
        </motion.button>
      </div>
    </motion.nav>

      {/* Main Section */}
      <div
      className="flex flex-1 min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #fff6e9, #ffffff)",
      }}
    >
      {/* Left Section */}
      <motion.div
        className="w-2/5 flex flex-col justify-center px-10 ml-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl font-bold text-[#FFA726] mb-6 leading-tight"
          variants={itemVariants}
        >
          Jadi Mahasiswa<br /> Jangan Sampai Gak<br /> Paham Materi!
        </motion.h1>
        <motion.p
          className="text-gray-600 text-xl mb-6"
          variants={itemVariants}
        >
          Jadikan Tutor.in sebagai solusi untuk kamu yang membutuhkan mentor
          belajar. Bikin belajar jadi mudah dan praktis dengan para Mentor kami.{" "}
          <span className="text-[#FFA726] font-bold">#UntungAdaTutorin</span>
        </motion.p>
        <motion.div className="flex justify-start" variants={itemVariants}>
          <button
            onClick={() => navigate("/register")}
            className="relative group overflow-hidden bg-[#FFA726] text-white font-semibold px-16 py-3 rounded-md shadow-md focus:outline-none"
          >
            <span
              className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"
            ></span>
            <span
              className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-[#FFA726]"
            >
              Daftar Sekarang
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <div className="w-3/5 relative flex items-center justify-center">
        <img
          src={WaveBG}
          alt="Wave Background"
          className="absolute right-0 top-0 w-3/4 h-full object-cover"
        />
        <img
          src={PeopleImage}
          alt="People"
          className="relative z-10 max-w-xs md:max-w-md lg:max-w-lg transform -translate-x-16 scale-110 mr-12 mb-12"
        />
      </div>
    </div>

      {/* Feature Section */}
      <section 
        className="py-16 px-10 mb-10"
        style={{ backgroundColor: '#fff6e9' }}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-[#FFA726]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Kenapa harus Tutor.in?
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
            >
              <img src={feature.img} alt={`Feature ${index + 1}`} className="h-20 mb-4" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        className="flex justify-center bg-white items-center py-16"
      >
        <div
          className="relative w-11/12 md:w-4/5 p-10"
          style={{
            borderRadius: "clamp(10px, 10%, 2rem)",
            backgroundColor: "#ffa726",
            padding: "2rem",
            marginLeft: "clamp(2rem, 5%, 5vh)",
            marginRight: "clamp(2rem, 5%, 5vh)",
          }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-4xl font-bold text-[#ffffff] mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}    
            >
              Apa Kata Mereka?
            </motion.h2>
            <motion.p 
              className="text-[#ffffff] text-2xl"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Yuk kepoin apa kata mereka yang sudah mencoba Tutor.In
            </motion.p>
          </div>

          {/* Navigasi Kiri dan Kanan */}
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition= {{ type: "spring", stiffness: 50, damping: 25, delay: 0.25 }}
          >
            {/* Tombol Prev */}
            <motion.button
              onClick={handlePrev}
              className="absolute left-[-2rem] md:left-[-3.5rem] bg-[#ffc46e] text-white rounded-full w-16 h-16 shadow-md hover:shadow-lg flex items-center justify-center"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}            
            >
              <img src={PrevVector} alt="Previous" className="w-8 h-8" />
            </motion.button>

            {/* Grid Card */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 1, ease: "easeOut" }}  // Transisi untuk animasi bergeser
              style={{ overflow: "hidden" }}  // Menjaga overflow saat transisi                     
            >
              {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-[#ffffff] p-6 shadow-md text-center border border-gray-300"
                  style={{
                    borderRadius: "clamp(10px, 7%, 2rem)",
                    aspectRatio: "1/1"
                  }}
                  variants={cardVariants}
                  initial={{ opacity: 0, x: 50 }}  // Mengatur posisi awal (muncul dari kanan)
                  animate={{ opacity: 1, x: 0 }}   // Pergeseran ke posisi normal
                  exit={{ opacity: 0, x: -50 }}    // Card yang hilang bergeser ke kiri
                  transition={{ duration: 0.5 }}    // Durasi transisi            
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-full"
                  />
                  <h3 className="font-bold text-xl text-[#ffa726]">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.review}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Tombol Next */}
            <motion.button
              onClick={handleNext}
              className="absolute right-[-2rem] md:right-[-3.5rem] bg-[#ffc46e] text-white rounded-full w-16 h-16 shadow-md hover:shadow-lg flex items-center justify-center"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              initial="hidden"
              animate="visible"
              variants={buttonVariants} 
            >
              <img src={NextVector} alt="Next" className="w-8 h-8" />
            </motion.button>
          </motion.div>

          {/* Indikator */}
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === Math.floor(currentIndex / 3)
                      ? "bg-gray-300"
                      : "bg-[#ffffff]"
                  }`}
                ></div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Forum Belajar */}
      <section className="container mx-auto p-6 mt-6 mb-12 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-left text-[#ffa726]">
            Forum Belajar
          </h1>
          <div className="flex items-center relative">
            <img 
              src={Filter} 
              alt="Filer Icon" 
              className="w-11 h-11 mr-2" 
              />
            <input
              type="text"
              placeholder="Search..."
              className="w-72 pl-10 px-2 py-3 rounded-3xl border border-[#ffa726] focus:outline-none focus:ring-2 focus:ring-[#ffe4bc] transition-all duration-200 ease-in-out shadow-sm"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                  handleSearch(e)
                }
              }}
            />
            <img src={Search} alt="Search Icon" className="absolute left-16 top-1/2 transform -translate-y-1/2 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-4 flex flex-col"
              style={{ aspectRatio: '6/5' }}  // Membuat card lebih kotak
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4 transform transition-all duration-500 ease-in-out"
              />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>
                <p className="text-yellow-500 text-sm text-lg">{course.rating} ⭐</p> 
              </div>
              <p className="text-md mb-2">Rp {course.price} / meet</p>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-gray-600 text-md flex items-center">
                  <img src={People1} alt="Instructor photo" className="w-9 mr-2" />
                  {course.instructor}
                </p>
                <img 
                  src={Join} 
                  alt="Join Button" 
                  onClick={
                    () => navigate('/register')
                  }
                  className="w-20 mr-3 mb-3 transition-all duration-300 transform hover:scale-105 cursor-pointer" 
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer 
        className="text-white py-6"
        style={{ backgroundColor: '#FFA726' }}
      >
        <div className="container mx-auto grid grid-cols-12 gap-4 items-start min-h-[220px]">
          {/* Logo dan Copyright */}
          <div className="col-span-7 ml-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src={LogoWhite} 
                alt="Logo tutorin" 
                className="w-26 h-26 mb-3 mt-5"
              />
            </div>
            {/* Copyright */}
            <p className="text-lg">&copy; 2024 TutorIn. All rights reserved.</p>
          </div>

          {/* Links Section */}
          <div className="col-span-2">
            <h4 className="text-3xl font-bold mb-3 mt-5">Home</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-span-3 mt-5 mb-3">
            <h4 className="text-3xl font-bold">Social</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 space-y-2">
                <img 
                  src={Mail} 
                  alt="Logo Linkedin"
                  style={{
                    width: 24,
                    height: 24
                  }} 
                  className="mt-2"
                />
                <a href="mailto:tutorin@gmail.com" className="hover:underline">tutorin@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2 space-y-2">
                <img 
                  src={Instagram} 
                  alt="Logo Linkedin"
                  style={{
                    width: 24,
                    height: 24
                  }}
                  className="mt-2"
                />
                <a href="https://instagram.com/tutor.in" className="hover:underline">@tutor.in</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
