const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user-router");
const postRouter = require("./routes/post-router");
const roleRouter = require("./routes/role-router");
const authRouter = require("./auth/auth-router");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use(
  "/api/users",
  [authMiddleware, roleMiddleware(["ADMIN", "USER"])],
  userRouter
);
app.use("/api/posts", postRouter);
app.use("/api/roles", roleRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
