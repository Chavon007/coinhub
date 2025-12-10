import mongoose from "mongoose";

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export default dbConfig;
