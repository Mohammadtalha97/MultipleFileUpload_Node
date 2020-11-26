import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    imgCollection: {
      type: Array,
    },
  },
  {
    collection: "users",
  }
);

export default mongoose.model("User", userSchema);
