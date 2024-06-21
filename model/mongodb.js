const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/signup-log")
  .then(() => {
    console.log("User mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("userCollection", LogInSchema);
