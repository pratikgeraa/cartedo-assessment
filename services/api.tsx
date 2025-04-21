const BASE_URL = "https://cartedo-mock-api-d9672364e747.herokuapp.com";

export interface Course {
  id: string;
  title: string;
  description: string;
  image?: any;
}

export const fetchCourses = async () => {
  const response = await fetch(`${BASE_URL}/api/courses`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
};

// fetch by id
export const fetchCourse = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/courses/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch course");
  }
  return response.json();
};

export const addCourse = async (course: Course) => {
  const response = await fetch(`${BASE_URL}/api/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  if (!response.ok) {
    throw new Error("Failed to add course");
  }
  return response.json();
};
