import Document from "../models/Document.js";
import User from "../models/User.js";

export const getAdminReport = async (req, res) => {
  try {
    // Tổng giấy tờ
    const totalDocs = await Document.countDocuments();

    // Giấy tờ theo trạng thái
    const verifiedDocs = await Document.countDocuments({
      status: "Đã xác minh",
    });
    const pendingDocs = await Document.countDocuments({ status: "Chờ duyệt" });
    const rejectedDocs = await Document.countDocuments({
      status: "Bị từ chối",
    });

    // Người dùng hoạt động
    const activeUsers = await User.countDocuments({ status: "active" });

    const verifyRate =
      totalDocs === 0 ? 0 : Math.round((verifiedDocs / totalDocs) * 100);

    res.json({
      totalDocs,
      verifiedDocs,
      pendingDocs,
      rejectedDocs,
      activeUsers,
      verifyRate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
