import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subsRouter = Router();

// GET
subsRouter.get("/", (req, res) => res.send({ title: "GET ALL SUBSCRIPTIONS" }));
subsRouter.get("/:id", (req, res) => res.send({ title: "GET A SUBSCRIPTION Detail" }));
subsRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "GET UPCOMING RENEWALS" }));

subsRouter.get("/user/:id", authorize, getUserSubscriptions);

// POST
subsRouter.post("/", authorize, createSubscription);

// PUT
subsRouter.put("/:id", (req, res) => res.send({ title: "UPDATE A SUBSCRIPTION" }));
subsRouter.put("/:id/cancel", (req, res) => res.send({ title: "CANCEL A SUBSCRIPTION" }));

// DELETE
subsRouter.delete("/:id", (req, res) => res.send({ title: "DELETE A SUBSCRIPTION" }));

export default subsRouter;
