const path = require("path");
const fs = require("fs").promises;
const randtoken = require("rand-token");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

require("dotenv").config();

const { USER_ADMIN } = process.env;

const usersPath = path.join(__dirname, "db", "users.json");

async function getUsers() {
  const users = await fs.readFile(usersPath, "utf-8");
  return JSON.parse(users);
}

const setPassword = function (password) {
  return (password = bcrypt.hashSync(password, bcrypt.genSaltSync(6)));
};

const validPassword = function (password, userPs) {
  return bcrypt.compareSync(password, userPs);
};

async function signup(email, password) {
  try {
    const users = await getUsers();

    const validUser = users.find((user) => user.email === email);

    if (validUser) {
      console.log("This email already exists");
      return;
    }

    
    users.push({id: shortid.generate(), email, password: setPassword(password), todos: [] });

    await fs.writeFile(usersPath, JSON.stringify(users), "utf-8");

    return users;
  } catch (error) {
    throw error;
  }
}

async function signin(email, password) {
  try {
    const users = await getUsers();
    let userPassword;
    users.find((user) => {
      if (user.email === email) {
        userPassword = user.password;
      }
    });

    const validatePassword = validPassword(password, userPassword);

    const validUser = users.find(
      (user) => user.email === email && validatePassword
    );

    if (!validUser) {
      console.log("There is no such user");
      return;
    }

    validUser.token = randtoken.generate(16);

    await fs.writeFile(usersPath, JSON.stringify(users), "utf-8");

    return users;
  } catch (error) {
    throw error;
  }
}

async function logout(email) {
  try {
    const users = await getUsers();

    const logoutUser = users.find((user) => user.email === email);

    if (!logoutUser) {
      return;
    }

    logoutUser.token = null;
    await fs.writeFile(usersPath, JSON.stringify(users), "utf-8");

    return users;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signup,
  signin,
  logout,
  getUsers,
};
