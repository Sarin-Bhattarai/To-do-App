const express = require("express");
const Todo = require("../model/todo");
const {
  todoValidation,
  edittodoValidation,
} = require("../validation/validation");
const { verifyLogin } = require("../middleware/verifylogin");
const handleError = require("../helper/handleError");
const validateUserId = require("../middleware/idvalidation");

const router = express.Router();

//to get all the todo list
router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find().populate("user", "_id");
    return res.status(200).json({
      status: "success",
      data: { todo: todo },
    });
  } catch (ex) {
    return res
      .status(400)
      .send({ status: "error", message: "Something went wrong" });
  }
});

//to get single todo list
router.get("/my", verifyLogin, async (req, res) => {
  try {
    const user = req.user;
    const todo = await Todo.find({ user: user._id });
    return res.status(200).json({
      status: "success",
      data: { todo: todo },
    });
  } catch (ex) {
    return res
      .status(400)
      .send({ status: "error", message: "Cannot get Todo list" });
  }
});

//to post todo list

router.post(
  "/",
  verifyLogin,
  todoValidation(),
  validateUserId(),
  handleError,
  async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      const todoDetails = {
        name: req.body.name,
        message: req.body.message,
        user: req.user._id,
      };
      const todo = new Todo(todoDetails);
      const result = await todo.save();
      return res.status(200).json({
        status: "success",
        data: { todo: result },
      });
    } catch (ex) {
      return res.status(400).send({ status: "error", message: ex.message });
    }
  }
);

//to edit the todo
router.put(
  "/:id",
  verifyLogin,
  edittodoValidation(),
  handleError,
  async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findOne({ _id: id });
      if (req.body.name) {
        todo.name = req.body.name;
      }
      if (req.body.message) {
        todo.message = req.body.message;
      }
      const updatedTodo = await todo.save();
      return res
        .status(200)
        .send({ status: "success", data: { todo: updatedTodo } });
    } catch (ex) {
      return res
        .status(400)
        .send({ status: "error", message: "Something went wrong" });
    }
  }
);

//to delete the todo
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.deleteOne({ _id: id });
    return res.status(200).send({ status: "Sucess", data: null });
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({ status: "error", message: ex.message });
  }
});

module.exports = router;
