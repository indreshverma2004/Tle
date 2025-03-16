const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type :String,
    require:true
  },
});

const Data = mongoose.model("Data", userSchema);

module.exports = Data;
