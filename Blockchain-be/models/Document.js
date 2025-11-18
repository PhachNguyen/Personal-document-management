import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },

    ipfsHash: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Chờ duyệt", "Đã xác minh", "Bị từ chối"],
      default: "Chờ duyệt",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Tự động tạo createdAt, updatedAt
);

export default mongoose.model("Document", documentSchema);
