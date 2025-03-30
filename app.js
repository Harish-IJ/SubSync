import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subsRouter from "./routes/subs.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json()); // Allows application to handle JSON data in req
app.use(express.urlencoded({ extended: false })); // Helps to proccess the form data
app.use(cookieParser()); // Reads cookies from incoming requests
app.use(arcjetMiddleware);

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subsRouter);
app.use("/api/v1/workflows", workflowRouter);

// MIDDLEWARES
app.use(errorMiddleware); // Custom

app.get("/", (req, res) => {
  res.send({ body: "Body Text SubSync" });
});

app.listen(PORT, async () => {
  console.log(`SubSync listening on port ${PORT}!`);

  // CONNECTING TO DB
  await connectDB();
});

export default app;
