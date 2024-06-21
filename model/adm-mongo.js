const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/signup-log")
  .then(() => {
    console.log("Admin mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const adminCollection = new mongoose.model("admincollect", LogInSchema);
module.exports = adminCollection;
