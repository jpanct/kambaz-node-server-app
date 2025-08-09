import { useState } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/esm/Form";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, 
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", 
    completed: false, 
    score: 0,
  });

  const [module, setModule] = useState({
    id: 1,
    name: "Introduction to NodeJS",
    description: "Learn the basics of NodeJS and ExpressJS",
    course: "CS101"
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      
      {/* Assignment Section */}
      <h4>Assignment</h4>
      <h5>Retrieving Objects</h5>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      
      <h5>Retrieving Properties</h5>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      
      <h5>Modifying Properties</h5>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      {/* Assignment Score */}
      <a id="wd-update-assignment-score"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <FormControl 
        type="number" 
        className="w-75" 
        id="wd-assignment-score"
        value={assignment.score} 
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })}/>
      <hr />

      {/* Assignment Completed */}
      <a id="wd-update-assignment-completed"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
      <Form.Check 
        type="checkbox" 
        id="wd-assignment-completed"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })}/>
      <hr />

      {/* Module Section */}
      <h4>Module</h4>
      <h5>Retrieving Module</h5>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={`${MODULE_API_URL}`}>
        Get Module
      </a><hr/>

      <h5>Modifying Module Name</h5>
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <FormControl 
        className="w-75" 
        id="wd-module-name"
        value={module.name} 
        onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />

      <h5>Modifying Module Description</h5>
      <a id="wd-update-module-description"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${encodeURIComponent(module.description)}`}>
        Update Module Description
      </a>
      <FormControl 
        as="textarea"
        rows={3}
        className="w-75" 
        id="wd-module-description"
        value={module.description} 
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/>
      <hr />

    </div>
  );
}