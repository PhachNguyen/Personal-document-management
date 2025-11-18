import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import FolderCard from "../components/FolderCard";
import DocumentCard from "../components/DocumentCard";
import documentApi from "../api/documentApi";
import UploadStatus from "../components/UploadStatus";
import { Filter, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const navigate = useNavigate();

  // 🧭 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 6;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);

        const res = await documentApi.getAll();
        const data = res.data || [];

        setDocuments(data);

        // Thông báo thành công
        toast.success("Tải dữ liệu tài liệu thành công!");

        // Gom thư mục
        const grouped = data.reduce((acc, doc) => {
          const folderName = doc.folder?.name || "Chưa phân loại";
          if (!acc[folderName]) acc[folderName] = [];
          acc[folderName].push(doc);
          return acc;
        }, {});

        const folderList = Object.keys(grouped).map((name, idx) => ({
          name,
          count: grouped[name].length,
          color: getColor(idx),
        }));

        setFolders(folderList);
      } catch (err) {
        console.error("❌ Lỗi khi tải tài liệu:", err);
        toast.error("Không thể tải dữ liệu, vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // ===== Màu thư mục =====
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  const getColor = (idx) => colors[idx % colors.length];

  // ===== Lọc & Sắp xếp =====
  const filteredDocs = documents
    .filter((doc) =>
      filterStatus === "Tất cả" ? true : doc.status === filterStatus
    )
    .sort((a, b) => {
      if (sortOption === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  // ===== Pagination =====
  const indexOfLast = currentPage * docsPerPage;
  const indexOfFirst = indexOfLast - docsPerPage;
  const currentDocs = filteredDocs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDocs.length / docsPerPage);

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <AppLayout>
      <UploadStatus />

      {/* ======= FOLDERS ======= */}
      <section>
        <div className="flex justify-between mb-3">
          <h2 className="text-lg font-semibold">Thư mục</h2>
        </div>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : folders.length === 0 ? (
          <p className="text-gray-500">Chưa có thư mục nào.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <FolderCard
                key={folder.name}
                title={folder.name}
                desc={`Chứa ${folder.count} tài liệu`}
                color={folder.color}
                count={folder.count}
                onClick={() =>
                  navigate(`/folders/${encodeURIComponent(folder.name)}`)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* ======= DOCUMENTS ======= */}
      <section className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            Tài liệu gần đây
          </h2>

          <div className="flex items-center gap-2">
            {/* Lọc trạng thái */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
            >
              {["Tất cả", "Đã xác minh", "Đã tải lên", "Chờ duyệt", "Lỗi"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                )
              )}
            </select>

            {/* Sắp xếp */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="name">Theo tên (A-Z)</option>
            </select>

            {/* Nút xem tất cả */}
            <button
              onClick={() => navigate("/documents")}
              className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
            >
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : filteredDocs.length === 0 ? (
          <p className="text-gray-500">Không có tài liệu phù hợp.</p>
        ) : (
          <>
            {/* Grid tài liệu */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentDocs.map((doc) => (
                <DocumentCard
                  key={doc._id}
                  title={doc.title}
                  folder={doc.folder?.name || "Không rõ"}
                  status={doc.status}
                  img={
                    doc.fileUrl?.startsWith("ipfs://")
                      ? `https://gateway.pinata.cloud/ipfs/${doc.fileUrl.replace(
                          "ipfs://",
                          ""
                        )}`
                      : doc.fileUrl ||
                        "https://placehold.co/400x250?text=No+Preview"
                  }
                  onClick={() => navigate(`/documents/${doc._id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-blue-600 border-blue-200 hover:bg-blue-50"
                }`}
              >
                Trước
              </button>

              <span className="text-sm text-gray-600">
                Trang <b>{currentPage}</b> / {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-blue-600 border-blue-200 hover:bg-blue-50"
                }`}
              >
                Sau
              </button>
            </div>
          </>
        )}
      </section>
    </AppLayout>
  );
}
