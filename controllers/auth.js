const { User } = require("../model/schemas/user");
const { registerSchema } = require("../model/schemas/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      Status: "409 Conflict",
      "Content-Type": "application/json",
      ResponseBody: {
        message: "Email in use",
      },
    });
  }

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      Status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: {
        message: error.message,
      },
    });
  }

  const avatarURL = gravatar.url("emerleite@gmail.com", {
    s: "200",
    r: "pg",
    d: "404",
  });

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    Status: "201 Created",
    "Content-Type": "application / json",
    ResponseBody: {
      user: {
        email: result.email,
        subscription: "starter",
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare || !user) {
    return res.status(401).json({
      Status: "401 Unauthorized",
      ResponseBody: {
        message: "Email or password is wrong",
      },
    });
  }

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      Status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: {
        message: error.message,
      },
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No content",
  });
};

const curent = async (req, res) => {
  const { _id, email } = req.user;
  const result = await User.findById(_id);

  res.status(200).json({
    Status: "200 Ok",
    "Content-Type": "application/json",
    ResponseBody: {
      email: email,
      subscription: "starter",
    },
  });
};

const avatarDir = path.join(__dirname, "../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250);
  await image.writeAsync(tempUpload);
  const extention = originalname.split(".").pop();
  const fileName = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatar", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    Status: "200 Ok",
    "Content-Type": "application/json",
    ResponseBody: {
      avatarURL: avatarURL,
    },
  });
};

module.exports = {
  register,
  login,
  logout,
  curent,
  updateAvatar,
};
