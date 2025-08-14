// src/Kambaz/Courses/index.tsx
import CourseNavigation from "./Navigation";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleDetails from "./People/Details";
import { useSelector } from "react-redux";
import {  useEffect } from "react";
import People from "./People";
export default function Courses() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const {  users: allUsers } = useSelector((state: any) => state.accountReducer);

  
  // Find the current course from Redux store
  const course = courses.find((course: any) => course._id === cid);
  
  // Fetch users for the current course
  const fetchUsers = () => {
    if (!allUsers || !Array.isArray(allUsers)) return;
    
    // Get enrollments for this course
    const courseEnrollments = enrollments.filter((e: any) => e.course === cid);
    
    // Get all users who are enrolled in this course
    const enrolledUserIds = courseEnrollments.map((e: any) => e.user);
    
    // Get the enrolled users from Redux state
    const enrolledUsers = allUsers.filter((user: any) => 
      enrolledUserIds.includes(user._id)
    );
    
    // Also include all faculty and admin users (they have access to all courses)
    const facultyAndAdmin = allUsers.filter((user: any) => 
      user.role === "FACULTY" || user.role === "ADMIN"
    );
    
    // Combine and remove duplicates
    const allCourseUsers = [...enrolledUsers, ...facultyAndAdmin];
    const uniqueUsers = allCourseUsers.filter((user, index, self) =>
      index === self.findIndex((u) => u._id === user._id)
    );
    
    
    console.log("Course ID:", cid);
    console.log("Course Enrollments:", courseEnrollments);
    console.log("Enrolled Users:", enrolledUsers);
    console.log("All Course Users:", uniqueUsers);
  };
  
  useEffect(() => {
    if (cid && allUsers) {
      fetchUsers();
    }
    console.log("Users from Redux in Courses:", allUsers); // Debug log
  }, [cid, enrollments, allUsers]); // Re-fetch when course, enrollments, or users change
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/new" element={<AssignmentEditor />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<People/>} />
            <Route path="People/:uid" element={<PeopleDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}