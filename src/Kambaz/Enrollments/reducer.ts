import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

// Initialize with database enrollments
const initialState = {
  enrollments: [...db.enrollments]
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, action) => {
      state.enrollments.push(action.payload);
    },
    removeEnrollment: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        e => !(e.user === userId && e.course === courseId)
      );
    },
    removeEnrollmentsForCourse: (state, action) => {
      state.enrollments = state.enrollments.filter(
        e => e.course !== action.payload
      );
    },
    autoEnrollStudent: (state, action) => {
      const { userId, courses } = action.payload;
      const userEnrollments = state.enrollments.filter(e => e.user === userId);
      
      // Auto-enroll in first 3 courses if no enrollments exist
      if (userEnrollments.length === 0 && courses.length >= 3) {
        courses.slice(0, 3).forEach((course: any) => {
          state.enrollments.push({
            _id: `auto-${userId}-${course._id}`,
            user: userId,
            course: course._id
          });
        });
      }
    }
  }
});

export const { 
  setEnrollments, 
  addEnrollment, 
  removeEnrollment, 
  removeEnrollmentsForCourse,
  autoEnrollStudent 
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;