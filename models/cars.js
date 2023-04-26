const mongoose = require("mongoose");
const carsSchema = new mongoose.Schema(
  {
    modelname: String,
    CountryOfOrigin: String,
    YearofOrigin: Number,
    brandname: String,
    isluxury: Boolean,
  },
  { timestamps: true }
);
const carsmodel = mongoose.model("Cars", carsSchema);
module.exports = carsmodel;
