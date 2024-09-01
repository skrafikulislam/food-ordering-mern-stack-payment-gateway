import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// ? login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials, User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials, Password is Incorrect",
      });
    }

    const token = createToken(user._id);

    res
      .status(200)
      .json({ success: true, message: "Token has been created", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

//! Token using jsonwebtoken
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "sadiya");
};

//? register user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //? Checking if user already registered
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    //? Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email , Please Add Valid Email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    //? Encrypting password with hashing with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //? Creating new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    //? Saving user to database
    const user = await newUser.save();

    const token = createToken(user._id);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error: ${error}` });
  }
};

export { loginUser, registerUser };
