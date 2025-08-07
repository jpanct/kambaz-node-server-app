// kambaz-node-server-app/Kambaz/Assignments/routes.js
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Create a new assignment for a course
  app.post("/api/courses/:cid/assignments", (req, res) => {
    try {
      const { cid } = req.params;
      const assignment = {
        ...req.body,
        course: cid,
      };
      const newAssignment = dao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all assignments for a course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    try {
      const { cid } = req.params;
      const assignments = dao.findAssignmentsForCourse(cid);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get a specific assignment
  app.get("/api/assignments/:aid", (req, res) => {
    try {
      const { aid } = req.params;
      const assignment = dao.findAssignmentById(aid);
      if (!assignment) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      }
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update an assignment
  app.put("/api/assignments/:aid", (req, res) => {
    try {
      const { aid } = req.params;
      const updatedAssignment = dao.updateAssignment(aid, req.body);
      res.json(updatedAssignment);
    } catch (error) {
      if (error.message === "Assignment not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  // Delete an assignment
  app.delete("/api/assignments/:aid", (req, res) => {
    try {
      const { aid } = req.params;
      dao.deleteAssignment(aid);
      res.sendStatus(204);
    } catch (error) {
      if (error.message === "Assignment not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  // Get all assignments (optional - for admin purposes)
  app.get("/api/assignments", (req, res) => {
    try {
      const assignments = dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}