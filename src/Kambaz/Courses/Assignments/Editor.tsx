import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  // Add debug at the very start
  console.log("AssignmentEditor component loaded!");
  
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // More debug info
  console.log("URL params - cid:", cid, "aid:", aid);
  console.log("Current URL:", window.location.pathname);
  
  try {
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    console.log("Redux state loaded successfully");
    console.log("Assignments:", assignments);
    console.log("Current user:", currentUser);
    
    // Check if we're creating a new assignment
    const isNewAssignment = aid === "new";
    
    // Find existing assignment if editing (and not creating new)
    const existingAssignment = !isNewAssignment ? assignments.find((a: any) => a._id === aid) : null;
    console.log("Found assignment:", existingAssignment);
    
    // Initialize form state with empty values
    const [assignment, setAssignment] = useState({
      _id: "",
      title: "",
      description: "",
      points: 100,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      assignmentGroup: "ASSIGNMENTS",
      displayGradeAs: "PERCENTAGE",
      submissionType: "ONLINE",
      onlineEntryOptions: {
        textEntry: true,
        websiteUrl: false,
        mediaRecordings: false,
        studentAnnotation: false,
        fileUploads: false
      },
      attempts: 1,
      course: cid || ""
    });

    // Load existing assignment data when component mounts or aid changes
    useEffect(() => {
      if (!isNewAssignment && existingAssignment) {
        // Convert dates to datetime-local format for input fields
        const formatDateForInput = (dateStr: string) => {
          if (!dateStr) return "";
          const date = new Date(dateStr);
          // Format: YYYY-MM-DDTHH:mm
          return date.toISOString().slice(0, 16);
        };

        setAssignment({
          _id: existingAssignment._id,
          title: existingAssignment.title || "",
          description: existingAssignment.description || "",
          points: existingAssignment.points || 100,
          dueDate: formatDateForInput(existingAssignment.dueDate),
          availableFrom: formatDateForInput(existingAssignment.availableFrom),
          availableUntil: formatDateForInput(existingAssignment.availableUntil),
          assignmentGroup: existingAssignment.assignmentGroup || "ASSIGNMENTS",
          displayGradeAs: existingAssignment.displayGradeAs || "PERCENTAGE",
          submissionType: existingAssignment.submissionType || "ONLINE",
          onlineEntryOptions: existingAssignment.onlineEntryOptions || {
            textEntry: true,
            websiteUrl: false,
            mediaRecordings: false,
            studentAnnotation: false,
            fileUploads: false
          },
          attempts: existingAssignment.attempts || 1,
          course: existingAssignment.course || cid || ""
        });
      } else if (isNewAssignment) {
        // Reset form for new assignment
        setAssignment({
          _id: "",
          title: "",
          description: "",
          points: 100,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
          assignmentGroup: "ASSIGNMENTS",
          displayGradeAs: "PERCENTAGE",
          submissionType: "ONLINE",
          onlineEntryOptions: {
            textEntry: true,
            websiteUrl: false,
            mediaRecordings: false,
            studentAnnotation: false,
            fileUploads: false
          },
          attempts: 1,
          course: cid || ""
        });
      }
    }, [aid, isNewAssignment, existingAssignment, cid]);

    const handleSave = () => {
      if (!assignment.title.trim()) {
        alert("Assignment name is required");
        return;
      }

      const assignmentData = {
        ...assignment,
        course: cid,
        _id: isNewAssignment ? new Date().getTime().toString() : aid,
        // Convert dates back to ISO strings for storage
        dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString() : "",
        availableFrom: assignment.availableFrom ? new Date(assignment.availableFrom).toISOString() : "",
        availableUntil: assignment.availableUntil ? new Date(assignment.availableUntil).toISOString() : ""
      };

      if (!isNewAssignment) {
        // Editing existing assignment
        dispatch(updateAssignment(assignmentData));
      } else {
        // Creating new assignment
        dispatch(addAssignment(assignmentData));
      }

      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const handleCancel = () => {
      // Navigate back without saving changes
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    // Only allow FACULTY to create/edit assignments
    if (currentUser?.role !== "FACULTY") {
      return (
        <div className="alert alert-danger">
          You do not have permission to create or edit assignments.
        </div>
      );
    }

    return (
      <div id="wd-assignments-editor" className="container">
        <h2>{isNewAssignment ? "Create New Assignment" : "Edit Assignment"}</h2>
        <hr />
        
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input 
            id="wd-name"
            className="form-control"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            placeholder="New Assignment"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea
            id="wd-description"
            className="form-control"
            rows={10}
            value={assignment.description}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            placeholder="New Assignment Description"
          />
        </div>

        <div className="row mb-3">
          <div className="col-3 text-end">
            <label htmlFor="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-9">
            <input
              id="wd-points"
              type="number"
              className="form-control"
              value={assignment.points}
              onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3 text-end">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-9">
            <select
              id="wd-group"
              className="form-select"
              value={assignment.assignmentGroup}
              onChange={(e) => setAssignment({ ...assignment, assignmentGroup: e.target.value })}
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3 text-end">
            <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
          </div>
          <div className="col-9">
            <select
              id="wd-display-grade-as"
              className="form-select"
              value={assignment.displayGradeAs}
              onChange={(e) => setAssignment({ ...assignment, displayGradeAs: e.target.value })}
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
              <option value="COMPLETE_INCOMPLETE">Complete/Incomplete</option>
              <option value="LETTER_GRADE">Letter Grade</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3 text-end">
            <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          </div>
          <div className="col-9">
            <select
              id="wd-submission-type"
              className="form-select"
              value={assignment.submissionType}
              onChange={(e) => setAssignment({ ...assignment, submissionType: e.target.value })}
            >
              <option value="ONLINE">Online</option>
              <option value="ON_PAPER">On Paper</option>
              <option value="NO_SUBMISSION">No Submission</option>
            </select>
          </div>
        </div>

        {assignment.submissionType === "ONLINE" && (
          <div className="row mb-3">
            <div className="col-3 text-end">
              <label className="form-label">Online Entry Options</label>
            </div>
            <div className="col-9">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-text-entry"
                  checked={assignment.onlineEntryOptions.textEntry}
                  onChange={(e) => setAssignment({
                    ...assignment,
                    onlineEntryOptions: {
                      ...assignment.onlineEntryOptions,
                      textEntry: e.target.checked
                    }
                  })}
                />
                <label className="form-check-label" htmlFor="wd-text-entry">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-website-url"
                  checked={assignment.onlineEntryOptions.websiteUrl}
                  onChange={(e) => setAssignment({
                    ...assignment,
                    onlineEntryOptions: {
                      ...assignment.onlineEntryOptions,
                      websiteUrl: e.target.checked
                    }
                  })}
                />
                <label className="form-check-label" htmlFor="wd-website-url">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-file-upload"
                  checked={assignment.onlineEntryOptions.fileUploads}
                  onChange={(e) => setAssignment({
                    ...assignment,
                    onlineEntryOptions: {
                      ...assignment.onlineEntryOptions,
                      fileUploads: e.target.checked
                    }
                  })}
                />
                <label className="form-check-label" htmlFor="wd-file-upload">
                  File Uploads
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-3 text-end">
            <label className="form-label">Assign</label>
          </div>
          <div className="col-9">
            <div className="border rounded p-3">
              <div className="mb-3">
                <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
                <input
                  id="wd-assign-to"
                  className="form-control"
                  value="Everyone"
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
                <input
                  id="wd-due-date"
                  type="datetime-local"
                  className="form-control"
                  value={assignment.dueDate}
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-6">
                  <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                  <input
                    id="wd-available-from"
                    type="datetime-local"
                    className="form-control"
                    value={assignment.availableFrom}
                    onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                  <input
                    id="wd-available-until"
                    type="datetime-local"
                    className="form-control"
                    value={assignment.availableUntil}
                    onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-end">
          <button 
            className="btn btn-secondary me-2" 
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in AssignmentEditor:", error);
    return (
      <div className="alert alert-danger">
        <h4>Error loading Assignment Editor</h4>
        <p>Check console for details</p>
        <pre>{error.toString()}</pre>
      </div>
    );
  }
}