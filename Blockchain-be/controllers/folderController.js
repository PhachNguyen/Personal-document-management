import Folder from "../models/Folder.js";

// 📦 Lấy tất cả folder
export const getAllFolders = async (req, res) => {
    try {
        const folders = await Folder.find().sort({ createdAt: -1 });
        res.json(folders);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi tải danh sách thư mục", error: err.message });
    }
};

// 📁 Lấy chi tiết 1 folder theo ID
export const getFolderById = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) return res.status(404).json({ message: "Không tìm thấy thư mục" });
        res.json(folder);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy thư mục", error: err.message });
    }
};

// ➕ Tạo mới folder
export const createFolder = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Thiếu tên thư mục" });

        const exists = await Folder.findOne({ name });
        if (exists) return res.status(400).json({ message: "Thư mục đã tồn tại" });

        const folder = await Folder.create({ name });
        res.status(201).json(folder);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi tạo thư mục", error: err.message });
    }
};

// ✏️ Cập nhật tên thư mục
export const updateFolder = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Thiếu tên mới" });

        const exists = await Folder.findOne({ name });
        if (exists && exists._id.toString() !== id)
            return res.status(400).json({ message: "Tên thư mục đã tồn tại" });

        const updated = await Folder.findByIdAndUpdate(id, { name }, { new: true });
        if (!updated) return res.status(404).json({ message: "Không tìm thấy thư mục" });

        res.json({ message: "Cập nhật thành công", folder: updated });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi cập nhật thư mục", error: err.message });
    }
};

// ❌ Xóa folder
export const deleteFolder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Folder.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy thư mục" });
        res.json({ message: "Đã xóa thư mục thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa thư mục", error: err.message });
    }
};
