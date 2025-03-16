const mongoose=require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://indreshverma:indresh@cluster0.z4mrv.mongodb.net/<YourDatabaseName>?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false,
      }
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
