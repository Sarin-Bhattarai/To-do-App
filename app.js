const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connection Successful"));

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
