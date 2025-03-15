import User from "../models/user.js";

//getUser
const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const userInfo = await User.findById(userId);
    return res.json({ success: true, userInfo });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { getUser };
