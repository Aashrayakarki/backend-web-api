const mongoose = require("mongoose");

const connectDatabase = () => {

  mongoose.connect(process.env.MONGODB_CLOUD).then(() => {

    console.log("Database connected to " + process.env.MONGODB_CLOUD);

  })
};

module.exports = connectDatabase;