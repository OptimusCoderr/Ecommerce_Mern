const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

// Register User
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({
          success: false,
          message: "Invalid email format",
      });
  }
  
  // Password strength validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!passwordRegex.test(password)) {
      return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
  }

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({
              success: false,
              message: "User already exists with the same email!",
          });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ email, password: hashPassword });

      await newUser.save();
      res.status(201).json({
          success: true,
          message: "Registration successful",
          user: { id: newUser._id, email: newUser.email }, // Return user data
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: "An error occurred during registration",
      });
  }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User  not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password! Please try again",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
              id: user._id,
              role: user.role,
              email: user.email,
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "60m" }
          );

          res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in successfully",
            user: {
              email: user.email,
              role: user.role,
              id: user._id,
            },
          });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
};

//LOGOUT USER
const logoutUser = (req,res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged out successfully"
    })
}

//AUTH MIDDLE WARE
const authMiddleware =  async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorised user!'
        })}

        try {
             const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
             req.user = decoded;
             next()
        } catch (error) {
           res.status(401).json({
            success: false,
            message: 'Unauthorised user!'
        })

        }
}

module.exports = { registerUser , loginUser, logoutUser, authMiddleware };