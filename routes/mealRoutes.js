const express = require("express");
const router = express.Router();
const Meal = require("../models/meals");

//get all meals
router.get("/", async (req, res) => {
  try {
    const allMeal = await Meal.find({});
    res.json(allMeal);
    //Fruit.find({})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create a new Meal
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const createdMeal = await Meal.create(req.body);
    console.log(req.body);
    res.json(createdMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//show route - get 1 fruit

router.get("/:id", async (req, res) => {
  try {
    const singleMeal = await Meal.findById(req.params.id);
    res.json(singleMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//
router.put("/:id", async (req, res) => {
  try {
    const updateMeal = await Meal.findByIdAndUpdate(req.params.id, req.body);
    res.json(updateMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    res.json(deletedMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this route to test validations

router.post("/test-validation/name", async (req, res) => {
  try {
    const invalidName = {
      
      name: "B",
      category: "Beef",
      area: "French",
      instructions:
        "1.Marinate beef in red wine overnight. \n 2. Brown beef in batches, set aside \n 3.Saute bacon, onions, carrots \n 4. Return beef to pot, add wine marinade and stock.\n 5. Add mashed potatoes",
      difficulty: "Hard",
      cookTime: 240,
    };
    await Meal.create(invalidName);
    res.status(200).json({message: "Validation should have failed"});
  } catch (error) {
    res.status(400).json({
        message: "Name validation failed as expected",
        error: error.message
    });
    
  }
});
  //Test case 2: Invalid Difficulty Level
  router.post("/test-validation/difficulty", async (req, res) => {
  try {
    const invalidDifficulty = {
      
      name: "Moroccan Lamb Tagine",
      category: "Lamb",
      area: "Moroccan",
      instructions:
        "1. Marinate lamb with spices \n 2. Add Lamb, onions, garlic\n 3. Pour in stock and add dried fruits. Simmer for 2 hours \n  4. Serve with couscous",
      difficulty: "Super Hard",  // Invalid Difficulty
      cookTime: 150,
    };
    await Meal.create(invalidDifficulty);
    res.status(200).json({message: "Validation should have failed"});
  } catch (error) {
    res.status(400).json({
        message: "Difficulty validation failed as expected",
        error: error.message
    });
  }
  });

  //Test case 3: Invalid Cooking Time
  router.post("/test-validation/cooktime", async(req, res) => {

  try {
    //Test case: Invalid cooking time for Easy Difficulty
    const invalidTime = {
      
      name: "Sushi Rolls",
      category: "Seafood",
      area: "Japanese",
      instructions:
        "1. Lay nori on bamboo mat, spead rice\n 2. Add avacado and fish \n 3. Roll tightly using mat \n 4.Serve with soy sauce and wasabi",
      difficulty: "Easy",
      cookTime: 120, //Should fail for Easy Difficulty
    };
    const meal = new Meal(invalidTime);
    await meal.validateMeal();
    await meal.save();
    res.status(200).json({message: "Validation should have failed"});
  } catch (error) {
    res.status(400).json({
      message:
        "Cook time validation failed as expected",
      error: error.message
    });
  }
});
module.exports = router;
