// kambaz-node-server-app/Kambaz/Enrollments/routes.js
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // Get all enrollments
  app.get("/api/enrollments", (req, res) => {
    try {
      const enrollments = dao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get courses for a specific user
  app.get("/api/users/:uid/courses", (req, res) => {
    try {
      const { uid } = req.params;
      const courses = dao.findCoursesForUser(uid);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get users enrolled in a specific course
  app.get("/api/courses/:cid/users", (req, res) => {
    try {
      const { cid } = req.params;
      const users = dao.findUsersForCourse(cid);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Check if a user is enrolled in a course
  app.get("/api/users/:uid/courses/:cid/enrolled", (req, res) => {
    try {
      const { uid, cid } = req.params;
      const enrolled = dao.isUserEnrolled(uid, cid);
      res.json({ enrolled });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Enroll a user in a course
  app.post("/api/users/:uid/courses/:cid", (req, res) => {
    try {
      const { uid, cid } = req.params;
      const enrollment = dao.enrollUserInCourse(uid, cid);
      res.json(enrollment);
    } catch (error) {
      if (error.message === "User is already enrolled in this course") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  // Unenroll a user from a course
  app.delete("/api/users/:uid/courses/:cid", (req, res) => {
    try {
      const { uid, cid } = req.params;
      dao.unenrollUserFromCourse(uid, cid);
      res.sendStatus(204);
    } catch (error) {
      if (error.message === "Enrollment not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });
}