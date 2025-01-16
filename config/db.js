const mongoose = require("mongoose");

const conn = async () => {
  try {
    //connect to database
    //console.log(process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", () => {
      console.log("connected to mongodb ");
    });
  } catch (error) {
    console.log(
      `Something went wrong connecting to mongodb : ${error.message}`
    );
  }
};

module.exports = conn;
