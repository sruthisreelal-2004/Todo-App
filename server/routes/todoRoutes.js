const express = require("express");

const router = express.Router();

const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByDate
} = require("../controllers/todoController");

// GET all todos
router.get("/", getTodos);

router.get("/date/:date", getTodosByDate);

// GET one todo
router.get("/:id", getTodo);

// CREATE todo
router.post("/", createTodo);

// UPDATE todo
router.put("/:id", updateTodo);

// DELETE todo
router.delete("/:id", deleteTodo);

module.exports = router;