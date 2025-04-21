"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface EnrollmentState {
  enrolledCourses: string[];
}

type Action =
  | { type: "ENROLL"; courseId: string }
  | { type: "UNENROLL"; courseId: string };

const initialState: EnrollmentState = {
  enrolledCourses: [],
};

const enrollmentReducer = (
  state: EnrollmentState,
  action: Action
): EnrollmentState => {
  switch (action.type) {
    case "ENROLL":
      return {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.courseId],
      };
    case "UNENROLL":
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.filter(
          (id) => id !== action.courseId
        ),
      };
    default:
      return state;
  }
};

const EnrollmentContext = createContext<
  | {
      state: EnrollmentState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const EnrollmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(enrollmentReducer, initialState);

  return (
    <EnrollmentContext.Provider value={{ state, dispatch }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider");
  }
  return context;
};
