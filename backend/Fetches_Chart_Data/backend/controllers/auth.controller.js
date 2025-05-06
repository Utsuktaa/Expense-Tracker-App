const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const { oauth2Client } = require("../utils/oAuth2Client");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const googleAuth = catchAsync(async (req, res, next) => {
  console.ol;
  const code = req.query.code;

  const googleRes = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
    { method: "GET" }
  );

  const userData = await userRes.json();
  console.log(userData);

  let user = await User.findOne({ email: userData.email });

  if (!user) {
    user = await User.create({
      name: userData.name,
      email: userData.email,
      password: await bcrypt.hash(process.env.DEFAULT_PASSWORD, 10),
    });
  } else {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("here at goole login");

    res.json({ token, email: user.email, name: user.name });
  }

  // createSendToken(user, 201, res);
});

module.exports = { register, login, googleAuth };
