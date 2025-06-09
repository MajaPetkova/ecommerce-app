import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.send({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.send({ success: false, message: "Invalid Credentials" })
    }

  } catch (err) {
    console.log(err);
    res.send({ success: false, message: err.message })
  }
};

// route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });

    // checking if user exist
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }
    // validation email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email is not valid" });
    }
    if (password.length < 5) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//route for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({success:true, token})
    }else{
      res.json({success:false, message:"Invalid credentials"})
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export { loginUser, registerUser, loginAdmin };
