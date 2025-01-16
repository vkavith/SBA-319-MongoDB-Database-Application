const express = require("express");
const router = express.Router();
const Area = require("../models/areas");

//get all Areas
router.get("/", async (req, res) => {
  try {
    const allArea = await Area.find({});
    res.json(allArea);
    //Fruit.find({})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create a new Area
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const createdArea = await Area.create(req.body);
    console.log(req.body);
    res.json(createdArea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//show route - get 1 Area

router.get("/:id", async (req, res) => {
  try {
    const singleArea = await Area.findById(req.params.id);
    res.json(singleArea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//
router.patch("/:id", async (req, res) => {
  try {
    const updateArea = await Area.findByIdAndUpdate(req.params.id, req.body);
    res.json(updateArea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
