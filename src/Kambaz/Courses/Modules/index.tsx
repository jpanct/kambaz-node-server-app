import { useParams, useLocation, Link } from "react-router-dom";
import * as db from "../../Database";
import { BsGripVertical } from "react-icons/bs";
import { FormControl, ListGroup } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import CourseStatus from "../Home/Status";
import  { useState, useReducer } from "react";

function modulesReducer(state: any[], action: any) {
  switch (action.type) {
    case "ADD_MODULE":
      return [...state, action.module];
    case "DELETE_MODULE":
      return state.filter((m) => m._id !== action.moduleId);
    case "UPDATE_MODULE":
      return state.map((m) => m._id === action.module._id ? action.module : m);
    case "EDIT_MODULE":
      return state.map((m) => m._id === action.moduleId ? { ...m, editing: true } : m);
    default:
      return state;
  }
}

export default function Modules() {
  const { cid } = useParams();
  const location = useLocation();
  const [modules, dispatch] = useReducer(modulesReducer, db.modules);
  const [moduleName, setModuleName] = useState("");
  
  const addModule = () => {
    dispatch({
      type: "ADD_MODULE",
      module: {
        _id: uuidv4(),
        name: moduleName,
        description: "",
        course: cid ?? "",
        lessons: []
      }
    });
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    dispatch({ type: "DELETE_MODULE", moduleId });
  };

  const editModule = (moduleId: string) => {
    dispatch({ type: "EDIT_MODULE", moduleId });
  };

  const updateModule = (module: any) => {
    dispatch({ type: "UPDATE_MODULE", module });
  };

  const addLesson = (moduleId: string) => {
    const module = modules.find((m: any) => m._id === moduleId);
    if (module) {
      const newLesson = {
        _id: uuidv4(),
        name: "New Lesson",
        description: "",
        module: moduleId
      };
      dispatch({
        type: "UPDATE_MODULE",
        module: { ...module, lessons: [...(module.lessons || []), newLesson] }
      });
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-xl-9">
        <ModulesControls 
          moduleName={moduleName} 
          setModuleName={setModuleName} 
          addModule={addModule} 
        />
        <br /><br /><br />
        
        <ListGroup className="rounded-0" id="wd-modules">
          {modules
            .filter((module: any) => module.course === cid)
            .map((module: any) => {
              const isModuleSelected = location.pathname.includes(`/Modules/${module._id}`);
              
              return (
                <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                  <div className={`wd-title p-3 ps-2 d-flex justify-content-between align-items-center ${
                    isModuleSelected ? "bg-success text-white" : "bg-secondary"
                  }`}>
                    <div className="d-flex align-items-center flex-grow-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {!module.editing && module.name}
                      {module.editing && (
                        <FormControl 
                          className="w-50 d-inline-block"
                          value={module.name || ""}
                          onChange={(e) => updateModule({ ...module, name: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateModule({ ...module, editing: false });
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </div>
                    <ModuleControlButtons
                      module={module}
                      moduleId={module._id}
                      deleteModule={deleteModule}
                      editModule={editModule}
                      updateModule={updateModule}
                      addLesson={addLesson}
                    />
                  </div>
                  
                  {module.lessons && module.lessons.length > 0 && (
                    <ListGroup className="wd-lessons rounded-0">
                      {module.lessons.map((lesson: any) => {
                        const isActive = location.pathname === `/Kambaz/Courses/${cid}/Modules/${module._id}/Lessons/${lesson._id}`;
                        const isSection = lesson.name === lesson.name.toUpperCase() || 
                                         ['LEARNING OBJECTIVES', 'READING', 'SLIDES'].includes(lesson.name);
                        
                        return (
                          <ListGroup.Item 
                            key={lesson._id} 
                            className={`wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center ${
                              isActive ? "border-start border-primary border-3" : ""
                            }`}
                            style={{ 
                              paddingLeft: isSection ? "1rem" : "3rem",
                              backgroundColor: isActive ? "#f8f9fa" : "transparent"
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <BsGripVertical className="me-2 fs-3" />
                              <Link 
                                to={`/Kambaz/Courses/${cid}/Modules/${module._id}/Lessons/${lesson._id}`}
                                className={`text-decoration-none ${isActive ? "text-primary" : "text-dark"}`}
                              >
                                {isSection ? <strong>{lesson.name}</strong> : lesson.name}
                              </Link>
                            </div>
                            <LessonControlButtons />
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </div>
      
      {/* Course Status Sidebar */}
      <div className="col-xl-3 d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}