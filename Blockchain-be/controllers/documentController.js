import Document from "../models/Document.js";
import { uploadToPinata } from "../utils/pinata.js";
import FormData from "form-data";

// ✅ 1. Tải lên tài liệu mới
export const uploadDocument = async (req, res) => {
    try {
        const file = req.file;
        const { title, folder } = req.body;

        if (!file) return res.status(400).json({ message: "Chưa chọn file!" });

        const formData = new FormData();
        formData.append("file", file.buffer, file.originalname);

        const { ipfsHash, fileUrl } = await uploadToPinata(formData);

        const newDoc = await Document.create({
            title,
            folder,
            status: "Đã tải lên",
            ipfsHash,
            fileUrl,
            owner: req.user.id, // 🔹 từ middleware JWT
        });

        res.status(201).json({
            message: "Tải lên thành công",
            document: newDoc,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ 2. Lấy tất cả tài liệu (Admin có thể xem toàn bộ)
export const getAllDocuments = async (req, res) => {
    try {
        const docs = await Document.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ 3. Lấy chi tiết 1 tài liệu theo ID
export const getDocumentById = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: "Không tìm thấy tài liệu" });

        // chỉ cho phép owner xem
        if (doc.owner.toString() !== req.user.id)
            return res.status(403).json({ message: "Không có quyền truy cập" });

        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ 4. Cập nhật thông tin tài liệu
export const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const doc = await Document.findById(id);
        if (!doc) return res.status(404).json({ message: "Không tìm thấy tài liệu" });

        if (doc.owner.toString() !== req.user.id)
            return res.status(403).json({ message: "Không có quyền cập nhật" });

        Object.assign(doc, updates);
        await doc.save();

        res.json({ message: "Cập nhật thành công", document: doc });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ 5. Xóa tài liệu
export const deleteDocument = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: "Không tìm thấy tài liệu" });

        if (doc.owner.toString() !== req.user.id)
            return res.status(403).json({ message: "Không có quyền xóa" });

        await doc.deleteOne();
        res.json({ message: "Đã xóa tài liệu thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
