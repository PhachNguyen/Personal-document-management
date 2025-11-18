import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        // ví dụ: "document-expired", "system", "share"
        type: { type: String, default: "system" },
    },
    { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
