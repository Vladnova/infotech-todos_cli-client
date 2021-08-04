const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");
const { getUsers } = require("./users");

const usersPath = path.join(__dirname, "db", "users.json");

async function listTodos(userId) {
  try {
    const users = await getUsers();

    const list = users.find(
      (user) => user.id === userId && user.token && user.todos
    );

    return list?.todos || "not authorized";
  } catch (error) {
    throw error;
  }
}

async function getTodoById(userId, todoId) {
  try {
    const users = await getUsers();

    let todo;

    users.find((user) => {
      if (!user.token) {
        return;
      }

      if (user.id === userId) {        
        todo = user.todos.filter((todo) => todo.id === todoId);
      }
    });

    return todo ? todo : "not authorized";
  } catch (error) {
    throw error;
  }
}

async function removeTodo(userId, todoId) {
  try {
    const users = await getUsers();

    const authorized = users.find((user) => { 
      
       if (!user.token) {
          return;
        };

      if (user.id === userId) {              
        user.todos = user.todos.filter((todo) => todo.id !== todoId);
        return user;
      };
    });

    await fs.writeFile(usersPath, JSON.stringify(users), "utf-8");
    return authorized ? users : "not authorized";
  } catch (error) {
    throw error;
  }
}

async function updateTodo(userId, todoId, title, text) {
  try {
    const users = await getUsers();

    users.find((user) => {
      if (!user.token) {
        return;
      }

      if (user.id === userId) {
        user.todos.filter((todo) => {
          if (todo.id === todoId) {
            title ? (todo.title = title) : todo.title;
            text ? (todo.text = text) : todo.text;
            return todo;
          }
        });
      }
    });

    await fs.writeFile(usersPath, JSON.stringify(users), "utf-8");

    return users;
  } catch (error) {
    throw error;
  }
}

async function addTodo(userId, title, text) {
  try {
    const users = await getUsers();

    const authorized = users.filter(
      (user) =>
        user.id === userId &&
        user.token &&
        user.todos.push({ id: shortid.generate(), title, text })
    );

    await fs.writeFile(usersPath, JSON.stringify(users), "utf-8");
    return authorized.length !== 0 ? users : "not authorized";
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listTodos,
  getTodoById,
  removeTodo,
  addTodo,
  updateTodo,
};
