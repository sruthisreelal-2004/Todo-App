const Todo = require("../models/todoModel");

// GET /api/todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.getAllTodos();

        res.status(200).json(todos);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch todos"
        });
    }
};

// GET /api/todos/:id
const getTodo = async (req, res) => {
    try {
        const todo = await Todo.getTodoById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch todo"
        });
    }
};

// POST /api/todos
const createTodo = async (req, res) => {
    try {

        const { title, due_date } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.createTodo(
            title.trim(),
            due_date || null
        );

        res.status(201).json(todo);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create todo"
        });
    }
};

// PUT /api/todos/:id
const updateTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.updateTodo(
            req.params.id,
            title.trim(),
            Boolean(completed)
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update todo"
        });
    }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.deleteTodo(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            todo
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete todo"
        });
    }
};

// GET todos by date
const getTodosByDate = async (req, res) => {
    try {

        const { date } = req.params;

        const todos = await Todo.getTodosByDate(date);

        res.status(200).json(todos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch todos by date"
        });
    }
};

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByDate
};