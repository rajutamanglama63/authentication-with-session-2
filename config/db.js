const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const databaseConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB conection established...")
    } catch (err) {
        console.error("Something went wrong during connection process...");
        process.exit(1);
    }
}

module.exports = databaseConnection;