const mongoose = require("mongoose");
const studentsSchmea = new mongoose.Schema(
  {
    name: String,
    age: Number,
    class: String,
    rollno: Number,
    email: String,
    hobby: String,
  },
  { timestamps: true }
);

const studentsmodel = mongoose.model("Students", studentsSchmea);
module.exports = studentsmodel;
