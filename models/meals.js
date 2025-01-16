const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Meal name is required"],
    minlength: [2, "Meal name must be atleast 2 characters long"],
    maxlength: [50, "Meal name cannot exceed 50 characters"],
  },

  category: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: [true, "Difficulty level is required"],
    enum: {
      values: ["Easy", "Medium", "Hard"],
      message: "{VALUE} is not a valid difficulty level",
    },
  },
  cookTime: {
    type: Number,
    required: [true, "Cooking time is required"],
    min: [1, "Cooking time must be atleast 1 minute"],
    max: [480, "Cooking time cannot exceed 8 hours(480 min)"],
    validate: {
      validator: Number.isInteger,
      message: "Cooking time must be a whole number",
    },
  },
});

//Add Index for frequently queried fields
mealSchema.index({ name: 1 });
mealSchema.index({ category: 1 });
mealSchema.index({ area: 1 });
mealSchema.index({ difficulty: 1 });
mealSchema.index({ cookTime: 1 });

//Custom validation method
mealSchema.methods.validateMeal = function () {
  if (this.difficulty === "Easy" && this.cookTime > 60) {
    throw new Error("Easy meals should not take longer than 60 minutes");
  }
};
//best to capitalise models

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
