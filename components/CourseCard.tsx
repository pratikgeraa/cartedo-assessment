"use client";
import React from "react";
import { Course } from "../services/api";
import { useEnrollment } from "../context/EnrollmentContext";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { state, dispatch } = useEnrollment();
  const isEnrolled = state.enrolledCourses.includes(course.id);

  const handleEnrollment = () => {
    if (isEnrolled) {
      dispatch({ type: "UNENROLL", courseId: course.id });
    } else {
      dispatch({ type: "ENROLL", courseId: course.id });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      {course.image && (
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={handleEnrollment}
          className={`px-4 py-2 rounded ${
            isEnrolled
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isEnrolled ? "Unenroll" : "Enroll"}
        </button>
        {isEnrolled && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            Enrolled
          </span>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
