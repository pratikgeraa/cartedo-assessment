"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormInputs {
  title: string;
  description: string;
}

interface AddCourseFormProps {
  onAddCourse: (data: FormInputs) => void;
}

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const AddCourseForm: React.FC<AddCourseFormProps> = ({ onAddCourse }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    onAddCourse(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h2 className="text-xl font-bold mb-4">Add New Course</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          {...register("title")}
          className="w-full px-3 py-2 border rounded"
          placeholder="Course Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          {...register("description")}
          className="w-full px-3 py-2 border rounded"
          placeholder="Course Description"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Course
      </button>
    </form>
  );
};

export default AddCourseForm;
