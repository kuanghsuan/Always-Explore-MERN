const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Fetch users fail.", 500));
  }
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const singup = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Sigingup fail", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exist already.", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const createdUser = User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Sign up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecrete_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Sign up failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login fail", 500);
    return next(error);
  }
  if (!existingUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        403
      )
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    new HttpError("Could not log you in, credentials seem to be wrong.", 500);
  }

  if (!isValidPassword) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        403
      )
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecrete_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Login up failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token: token });
};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;
