const {
  listTodos,
  getTodoById,
  removeTodo,
  addTodo,
  updateTodo,
} = require("./todos");

const { signup, signin, logout } = require("./users");

const argv = require("yargs").argv;

function invokeAction({ action,userId, id, title, text, email, password }) {
  switch (action) {
    case "list":
      listTodos(userId).then(console.table);
      break;

    case "get":
      getTodoById(userId, id).then(console.table);
      break;

    case "add":
      addTodo(userId, title, text).then(console.table);
      break;

    case "remove":
      removeTodo(userId, id).then(console.table);
      break;

    case "update":
      updateTodo(userId, id, title, text).then(console.table);
      break;

    case "signup":
      signup(email, password).then(console.log);
      break;

    case "signin":
      signin(email, password).then(console.log);
      break;

    case "logout":
      logout(email).then(console.log);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
