import Document from "../models/Document.js";
import Folder from "../models/Folder.js";
import { uploadToPinata } from "../utils/pinata.js";
import FormData from "form-data";

// =============================
// 1. Upload tài liệu
// =============================
export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    const { title, folderId } = req.body;

    if (!file) return res.status(400).json({ message: "Chưa chọn file!" });
    if (!title) return res.status(400).json({ message: "Thiếu tiêu đề!" });
    if (!folderId) return res.status(400).json({ message: "Thiếu folderId!" });

    const folder = await Folder.findById(folderId);
    if (!folder)
      return res.status(404).json({ message: "Không tìm thấy thư mục!" });

    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);

    const { ipfsHash, fileUrl } = await uploadToPinata(formData);

    const newDoc = await Document.create({
      title,
      folder: folder._id,
      ipfsHash,
      fileUrl,
      owner: req.user.id,
    });

    return res.status(201).json({
      message: "Tải lên thành công",
      ipfsHash,
      fileUrl,
      document: newDoc,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// =============================
// 2. Lấy tất cả tài liệu của user
// =============================
export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ owner: req.user.id })
      .populate("folder")
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// 3. Lấy tài liệu theo folder
// =============================
export const getDocumentsByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const docs = await Document.find({
      folder: folderId,
      owner: req.user.id,
    })
      .populate("folder")
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// 4. Lấy chi tiết tài liệu
// =============================
export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate("folder");

    if (!doc)
      return res.status(404).json({ message: "Không tìm thấy tài liệu!" });
    if (doc.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Không có quyền truy cập!" });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// 5. Cập nhật tài liệu
// =============================
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Không tìm thấy!" });

    if (doc.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Không có quyền sửa!" });

    const updated = await Document.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ message: "Cập nhật thành công!", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// 6. XÓA tài liệu
// =============================
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id);
    if (!doc)
      return res.status(404).json({ message: "Không tìm thấy tài liệu!" });

    if (doc.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Không có quyền xoá!" });

    await Document.findByIdAndDelete(id);

    res.json({ message: "Xóa tài liệu thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
