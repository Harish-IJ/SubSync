import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// GET
userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);

// POST
userRouter.post("/", (req, res) => res.send({ title: "CREATE NEW USER" }));

// PUT
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE USER" }));

// DELETE
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE USER" }));

export default userRouter;
