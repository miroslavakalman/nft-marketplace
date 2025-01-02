import mongoose from "mongoose";

const mongoUri =
  process.env.MONGODB_URI || "mongodb+srv://miroslava:miroslava@cluster0.njnkx.mongodb.net/?retryWrites=true&w=majority";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(mongoUri); 
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; 
  }
};

export default dbConnect;
