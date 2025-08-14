import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as courseDao from "../Courses/dao.js";
import mongoose from "mongoose";

export default function UserRoutes(app) {
const findAllUsers = async (req, res) => {
  try {
    console.log('=== DEBUG INFO ===');
    console.log('Connected to DB:', mongoose.connection.readyState === 1);
    console.log('Database name:', mongoose.connection.name);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Try BOTH collection names
    const userSingular = await mongoose.connection.db.collection('user').find({}).toArray();
    console.log('Collection "user" has:', userSingular.length, 'documents');
    
    const userPlural = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log('Collection "users" has:', userPlural.length, 'documents');
    
    // Normal query through mongoose
    const users = await dao.findAllUsers();
    console.log('DAO (mongoose) found:', users.length, 'documents');
    console.log('=== END DEBUG ===');
    
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};


  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };



  
  // Delete a user
  const deleteUser = async (req, res) => {
    try {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  // Find user by ID
  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  // Update user
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
   if (currentUser && currentUser._id === userId) {
     req.session["currentUser"] = { ...currentUser, ...userUpdates };
   }
    res.json(currentUser);
  };


  // Sign in
  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Sign up
  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
      const newUser = await dao.createUser(req.body);
      req.session["currentUser"] = newUser;
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Sign out
  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // Get current user profile
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // Create course for current user
  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.status(401).json({ message: "Must be logged in to create course" });
        return;
      }
      const newCourse = await courseDao.createCourse(req.body);
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Register all routes
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
}