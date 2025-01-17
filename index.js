require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const conn = require("./config/db");
conn();

const starterMeals = require("./config/mealseed");
const Meal = require("./models/meals");

const starterAreas = require("./config/areaseed");
const Area = require("./models/areas");

const starterCategories = require("./config/categoryseed");
const Category = require("./models/category");

const mealRoutes = require("./routes/mealRoutes");
const areaRoutes = require("./routes/areaRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use(express.json());
app.use("/api/meals", mealRoutes);
app.use("/api/area", areaRoutes);
app.use("/api/categories", categoryRoutes);

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

//Seed Areas
app.get("/api/seed/areas", async (req, res) => {
  // Changed the route path
  try {
    // Clear existing data
    await Area.deleteMany({});

    // Insert new data
    const seededAreas = await Area.create(starterAreas);
    console.log("Database seeded successfully");
    res.json(seededAreas);
  } catch (error) {
    console.error("Seeding error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//Seed Category
app.get("/api/seed/categories", async (req, res) => {
  try {
    //Clear existing data
    await Category.deleteMany({});
    const seededCategories = await Category.create(starterCategories);
    res.json(seededCategories);
  } catch (error) {
    console.log(`Error loading seed data: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
