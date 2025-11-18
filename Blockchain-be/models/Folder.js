import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    // The folder's name must be unique
    name: { type: String, required: true },
    // Optional reference to the user who owns the folder
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Folder", folderSchema);
