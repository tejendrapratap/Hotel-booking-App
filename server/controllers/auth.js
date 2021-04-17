import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  // validation
  if (!name) return res.status(400).send("Name is Required");
  if (!email) return res.status(400).send("Email is Required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is Required and should be minimum 6 characters long");
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send("Email is Taken");

  // register user
  const user = new User(req.body);
  try {
    await user.save();
    console.log("User Created", user);
    return res.json({ ok: true });
  } catch {
    console.log("User Creation Failed ");
    return res.status(400).send("Error, Please try again");
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  // using the data in req, find the user in the DB
  // if the user with the email already exists
  const { email, password } = req.body;
  try {
    // check if user with that email exists in DB
    let user = await User.findOne({ email }).exec();
    // console.log("User Exists:", user);
    // if user not found
    if (!user) res.status(400).send("User with that email not found");
    // comapre password
    user.comparePassword(password, (err, match) => {
      console.log("compare Password in Login Err:", err);
      // if password doesn't match or returns an error
      if (!match || err) return res.status(400).send("Wrong Password");
      // Generate a Token & send as response to client
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    });
  } catch (err) {
    // if error, send the error message
    console.log("Login ERROR:", err);
    res.status(400).send("Sign in Failed");
  }
};
