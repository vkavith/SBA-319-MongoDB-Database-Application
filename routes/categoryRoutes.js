// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.json(allCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new category
router.post("/", async (req, res) => {
  try {
    const createdCategory = await Category.create(req.body);
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single category
router.get("/:id", async (req, res) => {
  try {
    const singleCategory = await Category.findById(req.params.id);
    if (!singleCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(singleCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;