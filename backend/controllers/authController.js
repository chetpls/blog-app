const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSpecialChart = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return "Password must be at least 8 characters long";
  }
  if (!hasNumber.test(password)) {
    return "Password must contain at least one number";
  }
  if (!hasSpecialChart.test(password)) {
    return "Password must contain at least one special character";
  }
  return null;
}


const register = async (req, res) => {
  const { username, email, password, confirmPassword, isAdmin = false } = req.body;
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).send({ message: passwordError});
  }

  if (password !== confirmPassword) {
    return res.status(400).send({message: "Passwords do not match"});
  }

  


  try {
    const existingUser = await User.findOne({email});
    if (existingUser){
      return res.status(400).send({message: "An account with this email already exits"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, isAdmin });
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).send({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: "Error fetching user information" });
  }
};

module.exports = { register, login, getUser };
