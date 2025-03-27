import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "User Name is required"], trim: true, minLength: 2, maxLength: 40 },
    email: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 40,
      unique: true,
      lowercase: true,
      matcH: [/\S+@\S+\.S+/, "Please fill a valid email required"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "User Password is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

// name, email, passowrd
