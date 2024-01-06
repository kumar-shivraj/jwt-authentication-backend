const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful...");
  })
  .catch((err) => {
    console.log("Something went wrong...");
    console.log(err.message);
    console.log("Error connecting to the database...");
  });
app.use(
  cors({
    origin: [process.env.ORIGIN],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
