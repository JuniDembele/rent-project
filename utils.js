const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", true);

const ConnectToDB = async () => {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Issues connecting to db " + err.messsage);
  }
};

const AppStarter = (port) => {
  console.log("server started on port " + port);
  ConnectToDB();
};

module.exports = {
  ConnectToDB,
  AppStarter,
};

module.exports.ConnectToDB = ConnectToDB;
