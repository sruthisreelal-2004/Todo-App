const pool = require("../config/db");

// Get all todos
const getAllTodos = async () => {
    const result = await pool.query(
        "SELECT * FROM todos ORDER BY id DESC"
    );

    return result.rows;
};

// Get one todo
const getTodoById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM todos WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// Create a todo
const createTodo = async (title, due_date = null) => {
    const result = await pool.query(
        `INSERT INTO todos (title, due_date)
         VALUES ($1, $2)
         RETURNING *`,
        [title, due_date]
    );

    return result.rows[0];
};

// Update a todo
const updateTodo = async (id, title, completed) => {
    const result = await pool.query(
        `UPDATE todos
         SET title = $1, completed = $2
         WHERE id = $3
         RETURNING *`,
        [title, completed, id]
    );

    return result.rows[0];
};

// Delete a todo
const deleteTodo = async (id) => {
    const result = await pool.query(
        "DELETE FROM todos WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

// Get todos by due date
const getTodosByDate = async (date) => {
    const result = await pool.query(
        `SELECT * FROM todos
         WHERE due_date = $1
         ORDER BY id DESC`,
        [date]
    );

    return result.rows;
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};