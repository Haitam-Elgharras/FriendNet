import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = req.body;

  // check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Validate password
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/;
  if (!re.test(password)) {
    return res.status(400).json({
      message:
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number",
    });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 1000),
    impressions: Math.floor(Math.random() * 1000),
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error during user registration:", error.message);
    console.log(error); // log the entire error object
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
