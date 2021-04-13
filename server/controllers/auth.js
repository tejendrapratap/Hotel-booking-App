import User from "../models/user";

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
    console.log("User Creation Failed");
    return res.status(400).send("Error, Please try again");
  }
};
