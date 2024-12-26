import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://satyamkalihari17:NsQKehe47zZWkwLJ@cluster0.wgdwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "prototype-v1",
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};

export default connect;
