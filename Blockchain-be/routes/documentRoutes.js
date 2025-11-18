import express from "express";
import multer from "multer";
import {
    uploadDocument,
    getAllDocuments,
    getDocumentsByFolder,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../controllers/documentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Tạo tài liệu mới
router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);

// Lấy toàn bộ tài liệu của user
router.get("/", authMiddleware, getAllDocuments);

// Lấy tài liệu trong 1 thư mục
router.get("/folder/:folderId", authMiddleware, getDocumentsByFolder);

// Lấy chi tiết 1 tài liệu
router.get("/:id", authMiddleware, getDocumentById);

// Cập nhật & Xóa
router.patch("/:id", authMiddleware, updateDocument);
router.delete("/:id", authMiddleware, deleteDocument);

export default router;
