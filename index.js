require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const conn = require("./config/db");
conn();

const starterMeals = require("./config/mealseed");
const Meal = require("./models/meals");

const mealRoutes = require("./routes/mealRoutes");

app.use(express.json());
app.use("/api/meals", mealRoutes);

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Meals DBI");
});

//Seed route = populate our db with starter data

// Seed route
app.get("/api/seed/meals", async (req, res) => {
  // Changed the route path
  try {
    // Clear existing data
    await Meal.deleteMany({});

    // Insert new data
    const seededMeals = await Meal.create(starterMeals);
    console.log("Database seeded successfully");
    res.json(seededMeals);
  } catch (error) {
    console.error("Seeding error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/seed/areas", async (req, res) => {
  // Changed the route path
  try {
    // Clear existing data
    await Meal.deleteMany({});

    // Insert new data
    const seededMeals = await Meal.create(starterMeals);
    console.log("Database seeded successfully");
    res.json(seededMeals);
  } catch (error) {
    console.error("Seeding error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
