// kambaz-node-server-app/Kambaz/Courses/dao.js
import Course from "./model.js";

// Make sure this is exported
export const findAllCourses = async () => {
  const courses = await Course.find();
  console.log(`DAO: Found ${courses.length} courses`);
  return courses;
};

// NOT this (missing export):
// const findAllCourses = async () => { ... }

// Also check that you have all these exports:
export const findCourseById = async (courseId) => {
  return await Course.findById(courseId);
};

export const createCourse = async (course) => {
  if (!course._id || course._id === "") {
    const courses = await Course.find().sort({ _id: -1 }).limit(1);
    let newId;
    
    if (courses.length > 0) {
      const lastId = courses[0]._id;
      const lastNum = parseInt(lastId.replace(/[^0-9]/g, ''));
      newId = `RS${lastNum + 1}`;
    } else {
      newId = "RS101";
    }
    
    course._id = newId;
  }
  
  return await Course.create(course);
};

export const updateCourse = async (courseId, courseUpdates) => {
  return await Course.findByIdAndUpdate(courseId, courseUpdates, { new: true });
};

export const deleteCourse = async (courseId) => {
  console.log('Attempting to delete course with ID:', courseId);
  const result = await Course.findOneAndDelete({ _id: courseId });
  
  if (result) {
    console.log('Successfully deleted course:', result);
    return result;
  }
  
  console.log('Course not found with _id:', courseId);
  return null;
};

export const findCoursesForEnrolledUser = async () => {
  if (!currentUser?._id) return; // Add this safety check
  
  try {
    const courses = await userClient.findCoursesForUser(currentUser._id);
    setCourses(courses);
  } catch (error) {
    console.error(error);
  }
};