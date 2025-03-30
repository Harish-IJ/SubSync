import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SEVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SEVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const userSubscriptions = await Subscription.find({ user: req.params.id });

    if (!userSubscriptions) {
      const error = new Error("Error getting user subscriptions");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: userSubscriptions });
  } catch (error) {
    next(error);
  }
};
