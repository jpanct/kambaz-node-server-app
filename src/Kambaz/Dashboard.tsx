import { Link } from "react-router-dom";
import * as db from "./Database";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard({ 
  courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse 
}: {
  courses: any[]; 
  course: any; 
  setCourse: (course: any) => void;
  addNewCourse: () => void; 
  deleteCourse: (course: any) => void;
  updateCourse: () => void; 
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Initialize enrollments with default courses for students
  const [enrollments, setEnrollments] = useState(() => {
    const dbEnrollments = [...db.enrollments];
    
    // If current user is a student, check if they have enrollments
    if (currentUser?.role === "STUDENT") {
      const userEnrollments = dbEnrollments.filter(e => e.user === currentUser._id);
      
      // If no enrollments, auto-enroll in first 3 courses
      if (userEnrollments.length === 0 && courses.length >= 3) {
        const defaultCourses = courses.slice(0, 3); // First 3 courses (RS101, RS102, RS103)
        defaultCourses.forEach((course, index) => {
          dbEnrollments.push({
            _id: `auto-${currentUser._id}-${course._id}`,
            user: currentUser._id,
            course: course._id
          });
        });
      }
    }
    
    return dbEnrollments;
  });
  
  // Filter courses for students - only show enrolled courses
  const displayedCourses = currentUser?.role === "FACULTY" 
    ? courses 
    : courses.filter((course) => 
        enrollments.some((enrollment: any) =>
          enrollment.user === currentUser?._id && 
          enrollment.course === course._id
        )
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />

      {/* Only show course management for FACULTY */}
      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button 
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            > 
              Add 
            </button>
          </h5>
          <br />
          <FormControl 
            value={course.name} 
            className="mb-2" 
            onChange={(e) => setCourse({ ...course, name: e.target.value })} 
          />
          <FormControl 
            as="textarea" 
            value={course.description} 
            rows={3}  
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {currentUser?.role === "FACULTY" ? "Published Courses" : "My Courses"} ({displayedCourses.length})
      </h2> 
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark">
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                    
                    {/* Only show Edit and Delete buttons for FACULTY */}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button 
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} 
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button 
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}