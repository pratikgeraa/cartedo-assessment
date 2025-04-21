"use client";
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import AddCourseForm from "../components/AddCourseForm";
import { Course, fetchCourses, addCourse } from "../services/api";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleAddCourse = async (courseData: {
    title: string;
    description: string;
  }) => {
    try {
      // Add a placeholder image
      const newCourseData = {
        ...courseData,
        image: "https://picsum.photos/200/300",
      };

      const newCourse = await addCourse({
        ...newCourseData,
        id: crypto.randomUUID(),
      });
      setCourses([...courses, newCourse]);
    } catch (err) {
      setError("Failed to add course. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Cartedo Course Enrollment
      </h1>

      <AddCourseForm onAddCourse={handleAddCourse} />

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
