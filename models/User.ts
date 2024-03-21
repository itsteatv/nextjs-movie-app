import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Must provide a email"],
    unique: [true, "Must be unique"],
  },
  password: {
    type: String,
    required: [true, "Must provide a password"],
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
