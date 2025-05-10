import { COOKIES_OPTIONS } from "../constants.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = async (req, res) => {
  // receive data from the request
  // validate the data
  // check if the user already exists
  // hash the password
  // save the user to the database
  // send a success response back to the client

  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await User.create({
    userName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "Something went wrong while creating a new user." });
  }

  return res.status(201).json({ user: createdUser });
};

const loginUser = async (req, res) => {
  // receive data from the request
  // validate credentials
  // check if the user exists and password is correct
  // generate a JWT token for the user
  // send a success response back to the client

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { accessToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIES_OPTIONS)
    .json({
      message: "Login successful.",
    });
};

const logoutUser = async (req, res) => {
await User.findByIdAndUpdate(
  req.user._id,
  {
    $unset: {
      refreshToken: 1,
    },
  },
  {
    new: true,
  }
);

return res
  .status(200)
  .clearCookie("accessToken", COOKIES_OPTIONS)
  .json({ message: "Logout successful" });
}

const isAuthenticated = async (req, res) => {
   try {
     const accessToken = req.cookies.accessToken;

     if (!accessToken) return res.status(401).json({ authenticated: false });

     return res.json({ authenticated: true, accessToken });

   } catch (error) {
     return res.json({ success: false, message: error.message });
   }
}

export {
  registerUser,
  loginUser,
  generateAccessAndRefreshTokens,
  isAuthenticated,
  logoutUser,
};
