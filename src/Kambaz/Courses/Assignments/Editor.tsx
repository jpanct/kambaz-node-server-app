export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container-fluid">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue="A1 - ENV + HTML" />
      </div>
      
      <div className="mb-3">
        <textarea 
          id="wd-description" 
          className="form-control" 
          rows={8}
          defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
        />
      </div>
      
      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Points</label>
        <div className="col-sm-9">
          <input id="wd-points" className="form-control" type="number" defaultValue={100} />
        </div>
      </div>
      
      <div className="row mb-3">
        <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
        <div className="col-sm-9">
          <select id="wd-group" className="form-select">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </select>
        </div>
      </div>
      
      <div className="row mb-3">
        <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">Display Grade as</label>
        <div className="col-sm-9">
          <select id="wd-display-grade-as" className="form-select">
            <option>Percentage</option>
            <option>Points</option>
            <option>Letter Grade</option>
            <option>Complete/Incomplete</option>
          </select>
        </div>
      </div>
      
      <div className="row mb-3">
        <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">Submission Type</label>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            <select id="wd-submission-type" className="form-select mb-3">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
              <option>External Tool</option>
            </select>
            
            <div>
              <label className="form-label fw-bold">Online Entry Options</label>
              
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="check-entry" id="wd-text-entry" />
                <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
              </div>
              
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="check-entry" id="wd-website-url" />
                <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
              </div>
              
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="check-entry" id="wd-media-recordings" />
                <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
              </div>
              
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="check-entry" id="wd-student-annotation" />
                <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
              </div>
              
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="check-entry" id="wd-file-upload" />
                <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-3">
        <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label text-end">Assign to</label>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
            <input id="wd-assign-to" className="form-control mb-3" defaultValue="Everyone" />
            
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
                <input type="date" id="wd-due-date" className="form-control" defaultValue="2024-05-13" />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                <input type="date" id="wd-available-from" className="form-control" defaultValue="2024-05-06" />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <input type="date" id="wd-available-until" className="form-control" defaultValue="2024-05-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <hr />
      
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}