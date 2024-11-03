import mongoose from "mongoose";

const dbname = "e-commerce";
const connectionString = `mongodb://localhost:27017/${dbname}`;

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });

  await mongoose.connect(connectionString);
};

export default connectDB;
