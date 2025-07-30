import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";

const initialState = {
  assignments: db.assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description || "",
        points: assignment.points || 100,
        dueDate: assignment.dueDate || new Date().toISOString(),
        availableFrom: assignment.availableFrom || new Date().toISOString(),
        availableUntil: assignment.availableUntil || "",
        submissionType: assignment.submissionType || "ONLINE",
        assignmentGroup: assignment.assignmentGroup || "ASSIGNMENTS",
        displayGradeAs: assignment.displayGradeAs || "PERCENTAGE",
        attempts: assignment.attempts || 1,
        modules: assignment.modules || []
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      );
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

export const { 
  setAssignments, 
  addAssignment, 
  deleteAssignment, 
  updateAssignment,
  editAssignment 
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;