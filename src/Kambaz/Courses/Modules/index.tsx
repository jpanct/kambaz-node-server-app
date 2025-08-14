import { useParams, useLocation, Link } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import {  ListGroup } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import CourseStatus from "../Home/Status";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Fix this import path - go up two levels to get to Kambaz/Modules
import * as modulesClient from "./client"; // This should be the modules client
import * as courseClient from "../client";
import { setModules, addModule, deleteModule, editModule, updateModule } from "./reducer";

// ... rest of your component
export default function Modules() {
  const { cid } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get modules from Redux store
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");
  
  const fetchModulesForCourse = async () => {
   const modules = await courseClient.findModulesForCourse(cid!);
   dispatch(setModules(modules));
 };
 useEffect(() => {
   fetchModulesForCourse();
 }, [cid]);

   const addModuleHandler = async () => {
   const newModule = await courseClient.createModuleForCourse(cid!, {
     name: moduleName,
     course: cid,
   });
   dispatch(addModule(newModule));
   setModuleName("");
 };
  const updateModuleHandler = async (module: any) => {
   await modulesClient.updateModule(module._id, module);
   dispatch(updateModule(module));
 };

  // Updated handler to post to server
 const deleteModuleHandler = async (moduleId: string) => {
   await modulesClient.deleteModule(moduleId);
   dispatch(deleteModule(moduleId));
 };


  // UPDATE THIS FUNCTION to save to server when editing is done
  const handleUpdateModule = async (module: any) => {
    try {
      // If module is being saved (editing = false), update on server
      if (module.editing === false && module._id) {
        await modulesClient.updateModule(module._id, module);
      }
      dispatch(updateModule(module));
    } catch (error) {
      console.error("Error updating module:", error);
    }
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
      dispatch(updateModule({ 
        ...module, 
        lessons: [...(module.lessons || []), newLesson] 
      }));
    }
  };


  return (
    <div className="row">
      <div className="col-12 col-xl-9">
        <ModulesControls 
            addModule={addModuleHandler}
          moduleName={moduleName} 
          setModuleName={setModuleName} 
          
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
         <input onChange={(e) =>
                  updateModuleHandler({ ...module, name: e.target.value }) }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateModuleHandler({ ...module, editing: false });
                  }
                }}
                value={module.name}/>
        )}
                    </div>
                    <ModuleControlButtons
                      module={module}
                      moduleId={module._id}
                      deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                      editModule={(moduleId) => dispatch(editModule(moduleId))} 
                      updateModule={handleUpdateModule}
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