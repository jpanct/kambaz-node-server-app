// src/Kambaz/Courses/reducer.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

// Define Course type
interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
  image?: string;
  editing?: boolean;
}

interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

// Async thunks
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    return await client.fetchAllCourses();
  }
);

export const createCourseThunk = createAsyncThunk(
  "courses/createCourse",
  async (course: any) => {
    return await client.createCourse(course);
  }
);

export const deleteCourseThunk = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId: string) => {
    await client.deleteCourse(courseId);
    return courseId;
  }
);

export const updateCourseThunk = createAsyncThunk(
  "courses/updateCourse",
  async (course: Course) => {
    return await client.updateCourse(course);
  }
);

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, { payload: course }) => {
      const newCourse: Course = {
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
      state.courses.push(newCourse);
    },
    updateCourse: (state, { payload: course }) => {
      const index = state.courses.findIndex(c => c._id === course._id);
      if (index !== -1) {
        state.courses[index] = course;
      }
    },
    editCourse: (state, { payload: courseId }) => {
      const course = state.courses.find(c => c._id === courseId);
      if (course) {
        course.editing = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      });
    
    // Create course
    builder.addCase(createCourseThunk.fulfilled, (state, action) => {
      state.courses.push(action.payload);
    });
    
    // Delete course
    builder
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          course => course._id !== action.payload
        );
      })
      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete course";
      });
    
    // Update course
    builder.addCase(updateCourseThunk.fulfilled, (state, action) => {
      const index = state.courses.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    });
  },
});

export const { 
  setCourses, 
  addCourse, 
  updateCourse,
  editCourse 
} = coursesSlice.actions;

export default coursesSlice.reducer;