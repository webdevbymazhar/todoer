const express = require("express");
const Todo = require("../models/todoSchema");
const router = express.Router();

router.post("/add", async (req, res) => {
  let todo = new Todo(req.body);

  try {
    let savedtodo = await todo.save();
    res.status(200).json({
      success: true,
      savedtodo,
    });
  } catch (error) {
    if ((error.code = 11000)) {
      res.status(400).json({
        message: "Todo must be different",
      });
    } else {
      res.status(500).json({
        message: error.message,
      });
    }
  }
});

router.get("/get", async (req, res) => {
  try {
    let alltodos = await Todo.find();
    res.json({
      success: true,
      alltodos,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let todo = await Todo.findById(id);
    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let todo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  if (req.body === "") {
    res.status(400).json({
      message: "Todo cannot be empty",
    });
  }
  try {
    let updatedtodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedtodo) {
      res.status(400).json({ success: false, message: "Todo not found!" });
    }
    res.status(200).json({ success: true, updatedtodo });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = router;
