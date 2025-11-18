import AppLayout from "../layout/AppLayout";
import { UploadCloud, Info } from "lucide-react";
import { useState, useEffect } from "react";
import documentApi from "../api/documentApi";
import folderApi from "../api/folderApi";

import {
  addDocument,
  getUploadCount,
  getExtraUploads,
} from "../blockchain/web3Provider";

import { toast } from "sonner";
import { ethers } from "ethers";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // 🔥 THÊM
  const [folderId, setFolderId] = useState("");

  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState([]);

  // Blockchain slots
  const [used, setUsed] = useState(0);
  const [extra, setExtra] = useState(0);

  const FREE_LIMIT = 2;

  // ============================
  // Load thư mục + slot upload
  // ============================
  useEffect(() => {
    loadStatus();
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      const res = await folderApi.getAll();
      setFolders(res.data);
    } catch (err) {
      toast.error("Không tải được danh sách thư mục!");
    }
  };

  const loadStatus = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setUsed(Number(await getUploadCount(address)));
      setExtra(Number(await getExtraUploads(address)));
    } catch (err) {
      console.log("Lỗi load slot:", err);
    }
  };

  const remaining = FREE_LIMIT + extra - used;
  const isLocked = remaining <= 0;

  // ============================
  // Preview file
  // ============================
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);

    if (!f) return setPreview(null);

    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else if (f.type === "application/pdf") {
      setPreview("/pdf-preview.png");
    } else {
      setPreview(null);
    }
  };

  // ============================
  // Submit Upload
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) return toast.error("Bạn đã hết lượt upload!");

    if (!file || !title || !folderId) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!");
    }

    try {
      setLoading(true);
      toast.loading("Đang tải lên...");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description); // 🔥 THÊM
      formData.append("folderId", folderId);
      formData.append("file", file);

      // 🟢 Upload lên BE → IPFS
      const res = await documentApi.upload(formData);
      const ipfsHash = res.data.document.ipfsHash;

      // 🟢 Ghi lên Blockchain
      await addDocument(title, ipfsHash);

      toast.success("Tải lên tài liệu thành công!");

      // Reset form
      setFile(null);
      setPreview(null);
      setTitle("");
      setDescription(""); // 🔥 RESET MÔ TẢ
      setFolderId("");

      loadStatus();
    } catch (err) {
      toast.error("Lỗi upload: " + err.message);
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  // ============================
  // Render
  // ============================
  return (
    <AppLayout>
      <h2 className="text-lg font-semibold mb-6">Tải lên tài liệu</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl">
        {/* FORM UPLOAD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border p-6 rounded-xl shadow space-y-5"
        >
          {/* SLOT INFO */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">
              Lượt còn lại:{" "}
              <span className="font-bold text-blue-600">{remaining}</span>
            </p>

            {isLocked && (
              <span className="text-red-500 font-medium">
                Bạn đã hết lượt – hãy mua thêm!
              </span>
            )}
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên tài liệu
            </label>
            <input
              type="text"
              value={title}
              disabled={isLocked}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-3 py-2 rounded w-full"
              placeholder="Nhập tên tài liệu..."
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              value={description}
              disabled={isLocked}
              onChange={(e) => setDescription(e.target.value)}
              className="border px-3 py-2 rounded w-full"
              placeholder="Nhập mô tả tài liệu..."
            />
          </div>

          {/* FOLDER */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Chọn thư mục
            </label>
            <select
              value={folderId}
              disabled={isLocked}
              onChange={(e) => setFolderId(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">-- Chọn thư mục --</option>
              {folders.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* FILE */}
          <div>
            <label className="block text-sm font-medium mb-2">Chọn file</label>
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed p-6 rounded-xl text-center block cursor-pointer hover:bg-gray-50"
            >
              <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              {file ? (
                <span className="text-blue-700 font-medium">{file.name}</span>
              ) : (
                <span className="text-gray-500">Nhấn để chọn file</span>
              )}
            </label>

            <input
              type="file"
              id="file-upload"
              className="hidden"
              disabled={isLocked}
              onChange={handleFileChange}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || isLocked}
            className={`w-full text-white py-2 rounded-lg text-lg 
              ${isLocked ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {loading ? "Đang xử lý..." : "Tải lên tài liệu"}
          </button>
        </form>

        {/* PREVIEW + STATUS */}
        <div className="space-y-6">
          {/* PREVIEW */}
          <div className="bg-white border rounded-xl shadow p-6 h-[350px] flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-[300px] max-w-full rounded-lg shadow"
              />
            ) : (
              <p className="text-gray-500">Không có file xem trước</p>
            )}
          </div>

          {/* STATUS */}
          <div className="bg-white border rounded-xl shadow p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Thông tin upload
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg text-center border">
                <p className="text-gray-600">Đã dùng</p>
                <p className="text-xl font-bold text-blue-600">{used}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg text-center border">
                <p className="text-gray-600">Lượt thêm</p>
                <p className="text-xl font-bold text-green-600">{extra}</p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg text-center border">
                <p className="text-gray-600">Tổng tối đa</p>
                <p className="text-xl font-bold text-indigo-600">
                  {FREE_LIMIT + extra}
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg text-center border">
                <p className="text-gray-600">Còn lại</p>
                <p className="text-xl font-bold text-orange-600">{remaining}</p>
              </div>
            </div>

            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Đặt đúng tên tài liệu để xác minh nhanh</li>
              <li>• File rõ nét giúp duyệt nhanh hơn</li>
              <li>• Chọn thư mục phù hợp để quản lý tốt hơn</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
