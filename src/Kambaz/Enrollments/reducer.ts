// src/Kambaz/Enrollments/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollInCourse: (state, { payload }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: payload.userId,
        course: payload.courseId
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenrollFromCourse: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => 
          !(enrollment.user === payload.userId && 
            enrollment.course === payload.courseId)
      );
    },
  },
});

export const { 
  setEnrollments, 
  enrollInCourse, 
  unenrollFromCourse 
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;