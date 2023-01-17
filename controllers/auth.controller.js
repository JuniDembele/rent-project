const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const { User } = require("../models");

const SignupController = async (req, res) => {
  try {
    let userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (userExist) {
      return res.status(400).json({
        message: "Account exist, login instead",
      });
    }
    const user = new User(req.body);
    const token = user.generateToken();
    await user.save();
    return res.status(201).json({
      message: "account created",
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        fullName: user.fullName,
        password: user.password,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues from this area",
    });
  }
};

const PasswordChangeController = async (req, res, next) => {
  try {
    const { password, oldPassword } = req.body;
    const user = await User.findById(req.user._id);
    let passwordCorrect = user.checkPassword(oldPassword);
    if (!passwordCorrect)
      return res.status(400).json({
        message: "password is incorrect",
      });
    user.password = password;
    user.save();
    return res.status(200).json({
      meessage: "password successfully changed",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server issues occured while verifying password",
    });
  }
};

const LoginController = async (req, res) => {
  try {
    let userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (!userExist) {
      return res.status(404).json({
        message: "You have no account. signup instead",
      });
    }

    const passwordCorrect = userExist.checkPassword(req.body.password);

    if (!passwordCorrect) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }

    const token = userExist.generateToken();

    return res.status(200).json({
      message: "login successful",
      token,
      user: {
        _id: userExist._id,
        fullName: userExist.fullName,
        email: userExist.email,
        phone: userExist.phone,
        username: userExist.username,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server issues from pass",
    });
  }
};

const RequestPasswordResetController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "email is required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const templatePath = path.join(process.cwd(), "/views/index.ejs");
    let resetToken = crypto.randomBytes(24).toString("hex");
    user.resetToken = resetToken;
    await user.save();
    const url = process.env.FRONTEND_URL + "/password-reset/" + resetToken;
    const body = await ejs.renderFile(templatePath, { user, url });
    await SendEmail({
      receiver: user.email,
      subject: "rent a book Password Reset",
      body: body,
    });
    res.status(200).json({
      message: "Password reset steps sent, check your email",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues try again");
  }
};

module.exports = {
  SignupController,
  LoginController,
  PasswordChangeController,
  RequestPasswordResetController,
};
