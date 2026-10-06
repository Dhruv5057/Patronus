import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

       const existingUser = await User.findOne({
             email: email
       });

       if (existingUser) {
        return res.status(400).json({
        message: "User already exists"
    });
    }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });
        user.password = undefined;
        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      message: "Login successful",
      token
    });

 } catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "Server error"
  });
}
};

export { signUp, login };
