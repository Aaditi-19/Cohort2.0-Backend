const express = require("express");
const app = express();
const autheRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", autheRouter);

module.exports = app;