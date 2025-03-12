import bcrypt from "bcrypt";

const roundSalt = 10;

async function encPassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, roundSalt);
    return hashPassword;
  } catch (error) {
    throw new Error(error);
  }
}

async function verifyPassword(password, hashPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
}

export { encPassword, verifyPassword };
