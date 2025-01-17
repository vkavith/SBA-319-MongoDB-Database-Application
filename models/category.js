// models/category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Add indexes
categorySchema.index({ name: 1 });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
