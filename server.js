const express = require("express"),
      bodyParser = require("body-parser"),
      app = express(),
      bcrypt = require("bcrypt-nodejs"),
      cors = require("cors"),
      knex = require("knex"),
      register = require('./controllers/register'),
      signin = require('./controllers/signin'),
      profile = require('./controllers/profile'),
      image = require('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "smart-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    //console.log(data);
  });

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('Welcome, Bienvenido');
});

app.post("/signin", signin.handleSignin(db, bcrypt))

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db)})

app.put("/image", (req, res) => { image.handleImagePut(req, res, db)})

app.post("/imageurl", (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
