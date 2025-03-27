import mongoose from "mongoose";

const subcscriptionSchema = new mongoose.Schema(
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
      requirefd: [true, "Subscription status is required"],
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
      type: "Date",
      required: [true, "Subscription renewal date is required"],
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

// BEFORE SAVE
subcscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    if (this.renewalDate < new Date()) {
      this.status = "expired";
    }
  }

  next();
});

const Subscription = mongoose.model("Subscription", subcscriptionSchema);

export default Subscription;
