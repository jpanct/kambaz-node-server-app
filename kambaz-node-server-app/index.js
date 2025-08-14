import express from "express";
import cors from "cors";  // Make sure this import is here
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import mongoose from "mongoose";


const addNewCourse = async () => {
   const newCourse = await courseClient.createCourse(course);
   setCourses([...courses, newCourse]);
 };

const app = express();

app.get('/api/test-db', async (req, res) => {
  try {
    const courseCount = await mongoose.connection.db.collection('courses').countDocuments();
    res.json({
      connected: mongoose.connection.readyState === 1,
      database: mongoose.connection.name,
      courseCount: courseCount,
      connectionString: mongoose.connection.host
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/api/debug/db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const courseCount = await mongoose.connection.db.collection('courses').countDocuments();
    
    res.json({
      connected: mongoose.connection.readyState === 1,
      database: mongoose.connection.name,
      collections: collections.map(c => c.name),
      courseCount: courseCount
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
app.use(
  cors({
   credentials: true,
   origin: process.env.NETLIFY_URL || "http://localhost:5173",
}));  // This line is critical!
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(
  session(sessionOptions)
);

app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
UserRoutes(app);
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

    