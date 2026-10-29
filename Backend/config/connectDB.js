const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()


if(!process.env.MONGODB_URI) {
    throw new Error("please provide MONGODB_URI in the .env filw ");
}

async function connectDB() {
    try {
         await mongoose.connect(process.env.MONGODB_URI)
         console.log("connect DB");
    }catch(error) {
        console.log("Mongodb connect error",error);
        process.exit(1)
    }
}




module.exports = connectDB;

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please provide MONGODB_URI in the .env file");
// }

// async function connectDB() {
//   try {
//     console.log("Connecting to:", process.env.MONGODB_URI); // Optional debug
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;
