// kambaz-node-server-app/Kambaz/Enrollments/dao.js
import db from "../Database/index.js";

// Find all enrollments
export const findAllEnrollments = () => {
  return db.enrollments;
};

// Find enrollments for a specific user
export const findEnrollmentsForUser = (userId) => {
  return db.enrollments.filter((enrollment) => enrollment.user === userId);
};

// Find enrollments for a specific course
export const findEnrollmentsForCourse = (courseId) => {
  return db.enrollments.filter((enrollment) => enrollment.course === courseId);
};

// Check if a user is enrolled in a course
export const isUserEnrolled = (userId, courseId) => {
  return db.enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
};

// Enroll a user in a course
export const enrollUserInCourse = (userId, courseId) => {
  // Check if already enrolled
  if (isUserEnrolled(userId, courseId)) {
    throw new Error("User is already enrolled in this course");
  }

  const newEnrollment = {
    _id: new Date().getTime().toString(),
    user: userId,
    course: courseId,
  };
  
  db.enrollments.push(newEnrollment);
  return newEnrollment;
};

// Unenroll a user from a course
export const unenrollUserFromCourse = (userId, courseId) => {
  const index = db.enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  
  if (index === -1) {
    throw new Error("Enrollment not found");
  }
  
  db.enrollments.splice(index, 1);
  return { success: true };
};

// Get all courses for a user (with course details)
export const findCoursesForUser = (userId) => {
  const userEnrollments = db.enrollments.filter((e) => e.user === userId);
  const courseIds = userEnrollments.map((e) => e.course);
  return db.courses.filter((course) => courseIds.includes(course._id));
};

// Get all users for a course (with user details)
export const findUsersForCourse = (courseId) => {
  const courseEnrollments = db.enrollments.filter((e) => e.course === courseId);
  const userIds = courseEnrollments.map((e) => e.user);
  return db.users.filter((user) => userIds.includes(user._id));
};