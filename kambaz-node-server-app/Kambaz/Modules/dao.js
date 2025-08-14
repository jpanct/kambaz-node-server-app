// Kambaz/Modules/dao.js
import mongoose from "mongoose"; // Import mongoose to generate an ObjectId
import Module from "./model.js";

// Finds all modules for a given course using async/await.
export const findModulesForCourse = async (courseId) => {
  const modules = await Module.find({ course: courseId });
  return modules;
};

// Creates a new module using async/await.
export const createModule = async (module) => {
  // FIX: Manually create a new Mongoose ObjectId.
  // This forces a valid _id to exist before saving, bypassing any
  // schema or model compilation issues that might be causing the error.
  module._id = new mongoose.Types.ObjectId();
  const newModule = await Module.create(module);
  return newModule;
};

// Deletes a module by its ID using async/await.
export const deleteModule = async (moduleId) => {
  const status = await Module.deleteOne({ _id: moduleId });
  return status;
};

// Updates a module by its ID using async/await.
export const updateModule = async (moduleId, moduleUpdates) => {
  const status = await Module.updateOne({ _id: moduleId }, { $set: moduleUpdates });
  return status;
};