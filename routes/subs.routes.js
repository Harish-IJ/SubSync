import { Router } from "express";

const subsRouter = Router();

// GET
subsRouter.get("/", (req, res) => res.send({ title: "GET ALL SUBSCRIPTIONS" }));
subsRouter.get("/:id", (req, res) => res.send({ title: "GET A SUBSCRIPTION Detail" }));
subsRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "GET UPCOMING RENEWALS" }));

subsRouter.get("/user/:id", (req, res) => res.send({ title: "GET ALL USER SUBSCRIPTIONS" }));

// POST
subsRouter.post("/", (req, res) => res.send({ title: "CREATE A SUBSCRIPTION" }));

// PUT
subsRouter.put("/:id", (req, res) => res.send({ title: "UPDATE A SUBSCRIPTION" }));
subsRouter.put("/:id/cancel", (req, res) => res.send({ title: "CANCEL A SUBSCRIPTION" }));

// DELETE
subsRouter.delete("/:id", (req, res) => res.send({ title: "DELETE A SUBSCRIPTION" }));

export default subsRouter;
