const {
  listTodos,
  getTodoById,
  removeTodo,
  addTodo,
  updateTodo,
} = require("./todos");

const { signup, signin, logout } = require("./users");

const argv = require("yargs").argv;

function invokeAction({ action, id, title, text, email, password }) {
  switch (action) {
    case "list":
      listTodos(email).then(console.table);
      break;

    case "get":
      getTodoById(email, id).then(console.table);
      break;

    case "add":
      addTodo(email, title, text).then(console.table);
      break;

    case "remove":
      removeTodo(email, id).then(console.table);
      break;

    case "update":
      updateTodo(email, id, title, text).then(console.table);
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
