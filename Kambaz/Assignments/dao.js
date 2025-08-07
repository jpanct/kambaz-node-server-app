// kambaz-node-server-app/Kambaz/Assignments/dao.js
import db from "../Database/index.js";

// Find all assignments
export const findAllAssignments = () => {
  return db.assignments;
};

// Find assignments for a specific course
export const findAssignmentsForCourse = (courseId) => {
  return db.assignments.filter((assignment) => assignment.course === courseId);
};

// Find a specific assignment by ID
export const findAssignmentById = (assignmentId) => {
  return db.assignments.find((assignment) => assignment._id === assignmentId);
};

// Create a new assignment
export const createAssignment = (assignment) => {
  const newAssignment = {
    ...assignment,
    _id: new Date().getTime().toString(), // Generate unique ID
  };
  db.assignments.push(newAssignment);
  return newAssignment;
};

// Update an existing assignment
export const updateAssignment = (assignmentId, assignment) => {
  const index = db.assignments.findIndex((a) => a._id === assignmentId);
  if (index === -1) {
    throw new Error("Assignment not found");
  }
  db.assignments[index] = {
    ...db.assignments[index],
    ...assignment,
    _id: assignmentId, // Preserve the ID
  };
  return db.assignments[index];
};

// Delete an assignment
export const deleteAssignment = (assignmentId) => {
  const index = db.assignments.findIndex((a) => a._id === assignmentId);
  if (index === -1) {
    throw new Error("Assignment not found");
  }
  db.assignments.splice(index, 1);
  return { success: true };
};