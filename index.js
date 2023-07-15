const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Hey!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
