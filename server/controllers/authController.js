import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
        return res.status(400).json({
         message: "Name, email and password are required"
             });
        }

                    if (!email.includes("@")) {
            return res.status(400).json({
                message: "Please enter a valid email"
            });
            }

            if (password.length < 8) {
  return res.status(400).json({
    message: "Password must be at least 8 characters"
  });
}

if (!/[A-Z]/.test(password)) {
  return res.status(400).json({
    message: "Password must contain at least one uppercase letter"
  });
}

if (!/[a-z]/.test(password)) {
  return res.status(400).json({
    message: "Password must contain at least one lowercase letter"
  });
}

if (!/[0-9]/.test(password)) {
  return res.status(400).json({
    message: "Password must contain at least one number"
  });
}

if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  return res.status(400).json({
    message: "Password must contain at least one special character"
  });
}

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

    if (!email || !password) {
    return res.status(400).json({
    message: "Email and password are required"
       });
    }

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
    const refreshToken = jwt.sign(
            { id: user._id },process.env.JWT_REFRESH_SECRET,
             {
               expiresIn: "7d"
  })               ;

    res.status(200).json({
      message: "Login successful",
      token,
      refreshToken
    });

 } catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "Server error"
  });
}
};

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token required"
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const token = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      token
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired refresh token"
    });
  }
};

const logout = (req, res) => {
  res.status(200).json({
    message: "Logout successful"
  });
};

export { signUp, login, refreshAccessToken, logout };
