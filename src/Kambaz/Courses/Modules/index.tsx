import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import LessonControlButtons from "./LessonControlButtons";
import CourseStatus from "../Home/Status";
import { ListGroup } from "react-bootstrap";

export default function Modules() {
  return (
    <div className="row">
      <div className="col-12 col-xl-9">
        <ModulesControls />
        <br /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" /> 
                Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
              </div>
              <LessonControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  <strong>LEARNING OBJECTIVES</strong>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Introduction to the course
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Learn what is Web Development
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  <strong>READING</strong>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Full Stack Developer - Chapter 1 - Introduction
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Full Stack Developer - Chapter 2 - Creating User Interfaces With React
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  <strong>SLIDES</strong>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Introduction to Web Development
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Creating an HTTP server with Node.js
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Creating a React Application
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
          
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" /> 
                Week 1, Lecture 2 - Formatting User Interfaces with HTML
              </div>
              <LessonControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  <strong>LEARNING OBJECTIVES</strong>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Learn how to create user interfaces with HTML
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Deploy the assignment
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  <strong>SLIDES</strong>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Introduction to HTML and the DOM
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Formatting Web content with Headings and Paragraphs
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center" style={{ paddingLeft: "3rem" }}>
                <div>
                  <BsGripVertical className="me-2 fs-3" /> 
                  Formatting content with Lists and Tables
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
      
      {/* Course Status Sidebar */}
      <div className="col-xl-3 d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}