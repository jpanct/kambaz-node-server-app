// kambaz-node-server-app/Kambaz/Enrollments/dao.js
import db from "../Database/index.js";
import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

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

export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
export const findUsersForCourse = async (courseId) => {
  const enrollments = await enrollmentModel.find({ course: courseId });
  const userIds = enrollments.map(e => e.user);
  const users = await userModel.find({ _id: { $in: userIds } });
  return users;
};