import express from "express";
import Hello from "./hello.js";
import lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";
import "dotenv/config";

mongoose.connect("mongodb://localhost:27017/kanbas");
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

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
  };
}
app.use(session(sessionOptions));



app.use(express.json());
ModuleRoutes(app);
lab5(app);
Hello(app);
CourseRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
