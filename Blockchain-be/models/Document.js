import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    folder: {
        type: String, // ✅ KHÔNG phải ObjectId
        required: true,
    },
    status: {
        type: String,
        enum: ["Đã tải lên", "Chờ duyệt", "Đã xác minh", "Lỗi"], // ✅ enum chứa tiếng Việt
        default: "Đã tải lên",
    },
    ipfsHash: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
    owner: { // ✅ KHỚP với controller
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Document", documentSchema);
