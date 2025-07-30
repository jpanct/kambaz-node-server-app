// src/Kambaz/Courses/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
  courses: db.courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, { payload: course }) => {
      const newCourse = {
        _id: new Date().getTime().toString(),
        name: course.name,
        number: course.number || `NEW${new Date().getTime()}`,
        startDate: course.startDate || new Date().toISOString(),
        endDate: course.endDate || new Date().toISOString(),
        department: course.department || "D101",
        credits: course.credits || 3,
        description: course.description || "",
        author: course.author || "Unknown",
        image: course.image || "/images/reactjs.jpg"
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (c: any) => c._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      );
    },
    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      );
    },
  },
});

export const { 
  setCourses, 
  addCourse, 
  deleteCourse, 
  updateCourse,
  editCourse 
} = coursesSlice.actions;

export default coursesSlice.reducer;