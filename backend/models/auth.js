const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmark: {
    type: [Schema.Types.Mixed], // Allows any object structure inside the array
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
