// Kambaz/Courses/routes.js
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {


   const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  console.log('🔧 CourseRoutes function called');

  // Create a new course
  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
      }
      res.json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update a course
  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.updateCourse(courseId, req.body);
      res.json(status);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a course
  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.deleteCourse(courseId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get modules for a course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ error: error.message });
    }
  });

 
 app.get("/api/courses/:cid/users", findUsersForCourse);

  // Create a module for a course
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      
      const moduleData = {
        name: req.body.name,
        description: req.body.description,
        course: courseId
      };

      const newModule = await modulesDao.createModule(moduleData);
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ error: error.message });
    }
  });
}