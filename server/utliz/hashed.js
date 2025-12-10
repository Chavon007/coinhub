import bcrypt from "bcrypt";

export const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const confirmedPassword = async (password, confirmedPassword) => {
  return await bcrypt.compare(password, confirmedPassword);
};
