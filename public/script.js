const API_URL = "/api/todos";


// Get all todos
async function getTodos() {

    const response = await fetch(API_URL);

    const todos = await response.json();

    displayTodos(todos);
}


// Display todos
function displayTodos(todos) {

    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${todo.completed ? "completed" : ""}">
                ${todo.title}
            </span>

            <div>
                <button onclick="completeTodo(${todo.id}, '${todo.title}', ${todo.completed})">
                    ${todo.completed ? "Undo" : "Done"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;

        todoList.appendChild(li);
    });
}


// Add todo
async function addTodo() {

    const input = document.getElementById("todoInput");

    const title = input.value.trim();

    if (title === "") {
        alert("Please enter a todo");
        return;
    }

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title
        })
    });

    input.value = "";

    getTodos();
}


// Complete / Undo todo
async function completeTodo(id, title, completed) {

    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            completed: !completed
        })
    });

    getTodos();
}


// Delete todo
async function deleteTodo(id) {

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"
    });

    getTodos();
}


// Load todos when page opens
getTodos();