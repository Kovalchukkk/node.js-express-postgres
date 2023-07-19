const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user-router");

const PORT = process.env.PORT || 8080;

const app = express();

app.use("/api", userRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
