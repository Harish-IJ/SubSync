import { Router } from "express";

const userRouter = Router();

// GET
userRouter.get("/", (req, res) => res.send({ title: "GET All USERS" }));
userRouter.get("/:id", (req, res) => res.send({ title: "GET SINGLE USER" }));

// POST
userRouter.post("/", (req, res) => res.send({ title: "CREATE NEW USER" }));

// PUT
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE USER" }));

// DELETE
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE USER" }));

export default userRouter;
