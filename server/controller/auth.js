import { hashedPassword, confirmedPassword } from "../utliz/hashed.js";
import { generateToken } from "../utliz/token.js";
import userModel from "../model/auth.js";
import { sendmail } from "../utliz/emailsender.js";
import { generateOTP, otpHTML } from "../utliz/otpgenerate.js";

//Create an account
export const createAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, password, city, country, YOB, nin } =
      req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }

    const hash = await hashedPassword(password);

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const createNewUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hash,
      city,
      country,
      YOB,
      nin,
      otp,
      otpExpires,
    });
    await sendmail(email, "Verify Your Account", otpHTML(otp));

    res.status(201).json({
      success: true,
      message: "Account created successfully.OTP sent to your email",
      userId: createNewUser._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "PLease fill all required fields" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invaild creditails" });
    }
    const isMatch = await confirmedPassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid creditails" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    const hasWallet = !!user.walletId;
    res.status(200).json({
      success: true,
      hasWallet,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and otp are required" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(401).json({ success: false, message: "Incorrect OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP Correct and account has been verified",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// forget password
