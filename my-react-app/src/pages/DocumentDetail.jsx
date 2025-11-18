import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FileText,
  CalendarDays,
  ShieldCheck,
  Link2,
  Loader2,
  ArrowLeft,
  Download,
} from "lucide-react";

import documentApi from "../api/documentApi";

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await documentApi.getById(id);
        setDocument(res.data);
      } catch (err) {
        console.error("❌ Lỗi tải tài liệu:", err);
        setError("Không thể tải chi tiết tài liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  // Convert IPFS → HTTP URL
  const fileUrl = document?.ipfsHash
    ? `https://gateway.pinata.cloud/ipfs/${document.ipfsHash}`
    : null;

  // ===== Detect MIME type from IPFS =====
  useEffect(() => {
    if (!fileUrl) return;

    async function detectMime() {
      try {
        const res = await fetch(fileUrl, { method: "HEAD" });
        const type = res.headers.get("Content-Type") || "";
        setFileType(type);
        console.log("📌 MIME TYPE:", type);
      } catch (err) {
        console.log("❌ Không xác định MIME:", err);
      }
    }

    detectMime();
  }, [fileUrl]);

  // ===== PREVIEW LOGIC =====
  const renderPreview = () => {
    if (!fileUrl) {
      return <p className="text-gray-500">Không có file để xem trước.</p>;
    }

    if (!fileType)
      return <p className="text-gray-400">Đang xác định loại file...</p>;

    // IMAGE
    if (fileType.startsWith("image/")) {
      return (
        <img
          src={fileUrl}
          alt="preview"
          className="max-w-full max-h-full object-contain"
        />
      );
    }

    // PDF
    if (fileType === "application/pdf") {
      return <iframe src={fileUrl} className="w-full h-full" />;
    }

    // VIDEO
    if (fileType.startsWith("video/")) {
      return (
        <video controls className="max-h-full max-w-full rounded-lg">
          <source src={fileUrl} type={fileType} />
        </video>
      );
    }

    // AUDIO
    if (fileType.startsWith("audio/")) {
      return (
        <audio controls className="w-full">
          <source src={fileUrl} type={fileType} />
        </audio>
      );
    }

    // TEXT / JSON
    if (fileType.startsWith("text/") || fileType.includes("json")) {
      return <iframe src={fileUrl} className="w-full h-full bg-white" />;
    }

    // OFFICE
    if (
      fileType.includes("word") ||
      fileType.includes("excel") ||
      fileType.includes("presentation")
    ) {
      return (
        <div className="text-gray-300 text-center">
          <p>Không thể xem trực tiếp loại file này.</p>
          <a
            href={fileUrl}
            download
            className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Tải xuống để xem
          </a>
        </div>
      );
    }

    // ZIP/RAR/UNKNOWN
    return (
      <div className="text-gray-400 text-center">
        <p>Không hỗ trợ xem trực tiếp loại file này.</p>
        <a
          href={fileUrl}
          download
          className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Tải xuống
        </a>
      </div>
    );
  };

  // ===== LOADING =====
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  // ===== ERROR =====
  if (error || !document) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-gray-300">
        <FileText className="w-10 h-10 mb-4 text-red-400" />
        <p>{error || "Không tìm thấy tài liệu."}</p>
        <button
          onClick={() => navigate("/documents")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8">
      {/* === HEADER === */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            Chi tiết tài liệu
          </h1>
        </div>

        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
          >
            <Link2 className="w-4 h-4" /> Mở IPFS
          </a>
        )}
      </div>

      {/* === CONTENT === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT INFO */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Thông tin tài liệu</h2>

          <ul className="space-y-4 text-sm text-gray-300">
            <li>
              <span className="text-gray-400">Tên tài liệu:</span>{" "}
              {document.title}
            </li>

            <li>
              <span className="text-gray-400">Thư mục:</span>{" "}
              {document.folder?.name}
            </li>

            <li className="flex items-start gap-2">
              <span className="text-gray-400">Mô tả:</span>
              <span className="whitespace-pre-line">
                {document.description || "Không có"}
              </span>
            </li>

            <li>
              <span className="text-gray-400">Trạng thái:</span>{" "}
              <span
                className={`px-2 py-1 text-xs rounded-full border ${
                  document.status === "Đã xác minh"
                    ? "bg-green-500/20 text-green-400 border-green-500/40"
                    : document.status === "Chờ duyệt"
                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                    : "bg-red-500/20 text-red-400 border-red-500/40"
                }`}
              >
                {document.status}
              </span>
            </li>

            <li className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              Ngày tải lên:{" "}
              {new Date(document.createdAt).toLocaleDateString("vi-VN")}
            </li>

            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              IPFS Hash:
              <span className="font-mono text-blue-400 break-all">
                {document.ipfsHash}
              </span>
            </li>
          </ul>

          {/* DOWNLOAD BUTTON */}
          <div className="mt-6">
            {fileUrl && (
              <a
                href={fileUrl}
                download
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm w-fit"
              >
                <Download className="w-4 h-4" /> Tải xuống
              </a>
            )}
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Xem trước tài liệu</h2>

          <div className="w-full h-[480px] bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center overflow-hidden">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}
