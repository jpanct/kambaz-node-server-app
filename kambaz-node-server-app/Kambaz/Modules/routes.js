// Kambaz/Modules/routes.js
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // Get all modules
  app.get("/api/modules", async (req, res) => {
    try {
      const modules = await modulesDao.findAllModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get module by ID
  app.get("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const module = await modulesDao.findModuleById(moduleId);
      if (module) {
        res.json(module);
      } else {
        res.status(404).json({ error: "Module not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update a module
  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      const status = await modulesDao.updateModule(moduleId, moduleUpdates);
      res.send(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a module
  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const status = await modulesDao.deleteModule(moduleId);
      res.send(status);
    } catch (error) {
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
      res.status(500).json({ error: error.message });
    }
  });

  // Create a module for a course (this might also be in CourseRoutes)
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId,
      };
      const newModule = await modulesDao.createModule(module);
      res.send(newModule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Add lesson to module
  app.post("/api/modules/:moduleId/lessons", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const lesson = req.body;
      const updatedModule = await modulesDao.addLessonToModule(moduleId, lesson);
      res.json(updatedModule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update lesson in module
  app.put("/api/modules/:moduleId/lessons/:lessonId", async (req, res) => {
    try {
      const { moduleId, lessonId } = req.params;
      const lessonUpdates = req.body;
      const updatedModule = await modulesDao.updateLessonInModule(moduleId, lessonId, lessonUpdates);
      res.json(updatedModule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete lesson from module
  app.delete("/api/modules/:moduleId/lessons/:lessonId", async (req, res) => {
    try {
      const { moduleId, lessonId } = req.params;
      const updatedModule = await modulesDao.deleteLessonFromModule(moduleId, lessonId);
      res.json(updatedModule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}