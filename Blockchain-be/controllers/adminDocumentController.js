import Document from "../models/Document.js";

// =============================
// Lấy tất cả tài liệu
// =============================
export const adminGetAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find()
      .populate("folder", "name")
      .populate("owner", "email fullName")
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// Lấy chi tiết tài liệu
// =============================
export const adminGetDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id)
      .populate("folder", "name")
      .populate("owner", "email fullName");

    if (!doc)
      return res.status(404).json({ message: "Không tìm thấy tài liệu!" });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// Cập nhật trạng thái (Duyệt / Từ chối)
// =============================
export const adminUpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const doc = await Document.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    )
      .populate("folder", "name")
      .populate("owner", "email fullName");

    if (!doc)
      return res.status(404).json({ message: "Không tìm thấy tài liệu!" });

    res.json({
      message: "Cập nhật trạng thái thành công!",
      document: doc,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
