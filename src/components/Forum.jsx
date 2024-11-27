import React, { useEffect, useState } from 'react';
import coursesData from '../data/courses.json';
import Join from '../assets/JoinButton.png'; // Gambar button Join
import People1 from '../assets/People3.png'; // Gambar instruktur
import './Forum.css'; // Import file CSS

const Forum = ({ courseId }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const selectedCourse = coursesData.find(course => course.id === courseId);
    setCourse(selectedCourse);
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const courseIMG = `/assets/${course.image}`;

  return (
    <div className="course-card border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-4 flex flex-col" style={{ aspectRatio: '6/5' }}>
      <img src={courseIMG} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-4 transform transition-all duration-500 ease-in-out" />
      <div className="flex justify-between items-center mb-2">
        <h2 className="course-title">{course.title}</h2>
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
          className="w-20 mr-3 mb-3 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          onClick={() => alert('Join Button Clicked')}
        />
      </div>
    </div>
  );
};

export default Forum;
