import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        color: { type: String, default: "#3b82f6" }, // để hiển thị màu trong FE
    },
    { timestamps: true }
);

export default mongoose.model("Folder", folderSchema);
