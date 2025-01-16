// models/area.js
const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  popularDishes: {
    type: [String],
    required: true,
  },
});

// Add indexes
areaSchema.index({ name: 1 });

const Area = mongoose.model("Area", areaSchema);
module.exports = Area;
