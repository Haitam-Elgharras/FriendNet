import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import cors from 'cors';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// import { users, posts } from "./data/index.js";
import User from "./models/User.js";
// import Post from "./models/Post.js";

import authRoutes from "./routes/auth.js";
import home from "./routes/home.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */

//  only when using import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: 'http://localhost:5173', // replace with your application's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors(corsOptions));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use("/", home);

// special route for registering users cause we need to upload a file
app.post("/auth/register", upload.single("profilePicture"), register);
app.post("/posts",verifyToken, upload.single("postPicture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    // // SEEDING
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(error.message));

  // get all users 
  app.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
