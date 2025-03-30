import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "INR", "EUR", "GBP"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", "quarterly", "half-yearly"],
      required: [true, "Subscription frequency is required"],
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Subscription payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Subscription status is required"],
      enum: ["active", "cancelled", "paused", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscription user is required"],
      index: true,
    },
  },
  { timestamps: true }
);

const renewalPeriods = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  quarterly: 90,
  "half-yearly": 182,
  yearly: 365,
};

// BEFORE SAVE
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const period = renewalPeriods[this.frequency];
    if (!period) {
      return next(new Error("Invalid frequency for renewal calculation"));
    }

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + period);

    if (this.renewalDate < new Date()) {
      this.status = "expired";
    }
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
