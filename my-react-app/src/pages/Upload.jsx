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
  const [folderId, setFolderId] = useState("");

  const [loading, setLoading] = useState(false);

  // 📁 Thư mục từ BE
  const [folders, setFolders] = useState([]);

  // Blockchain slot
  const [used, setUsed] = useState(0);
  const [extra, setExtra] = useState(0);

  const FREE_LIMIT = 2;

  // ============================
  // 🔥 Load trạng thái upload + thư mục
  // ============================
  useEffect(() => {
    loadStatus();
    loadFolders();
  }, []);

  async function loadFolders() {
    try {
      const res = await folderApi.getAll();
      setFolders(res.data); // BE trả về mảng [{_id, name}]
    } catch (err) {
      toast.error("Không tải được thư mục!");
      console.log(err);
    }
  }

  async function loadStatus() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const usedCount = Number(await getUploadCount(address));
      const extraCount = Number(await getExtraUploads(address));

      setUsed(usedCount);
      setExtra(extraCount);
    } catch (err) {
      console.log("Lỗi load slot:", err);
    }
  }

  const remaining = FREE_LIMIT + extra - used;
  const isLocked = remaining <= 0;

  // ============================
  // 📂 Preview file
  // ============================
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);

    if (!f) return;

    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else if (f.type === "application/pdf") {
      setPreview("/pdf-preview.png"); // icon pdf
    } else {
      setPreview(null);
    }
  };

  // ============================
  // 📤 Submit Upload
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) return toast.error("Bạn đã hết lượt upload!");

    if (!file || !title || !folderId)
      return toast.error("Vui lòng nhập đầy đủ thông tin!");

    try {
      setLoading(true);
      toast.loading("Đang tải lên...");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("folderId", folderId);
      formData.append("file", file);

      // 🟢 1. Upload BE → IPFS
      const res = await documentApi.upload(formData);
      const ipfsHash = res.data.document.ipfsHash;

      // 🟢 2. Ghi Smart Contract
      await addDocument(title, ipfsHash);

      toast.success("Tải lên tài liệu thành công!");

      // Reset
      setFile(null);
      setPreview(null);
      setTitle("");
      setFolderId("");
      loadStatus();
    } catch (err) {
      toast.error("Upload thất bại: " + err.message);
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  // ============================
  // RENDER
  // ============================
  return (
    <AppLayout>
      <h2 className="text-lg font-semibold mb-6">Tải lên tài liệu</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl">
        {/* ============================
            CỘT TRÁI – FORM UPLOAD
        ============================ */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border p-6 rounded-xl shadow space-y-5"
        >
          {/* Trên cùng – số lượt */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">
              Lượt còn lại:{" "}
              <span className="font-bold text-blue-600">{remaining}</span>
            </p>

            {isLocked && (
              <span className="text-red-500 font-medium">
                Cần mua token để tiếp tục tải thư mục lên
              </span>
            )}
          </div>

          {/* TÊN TÀI LIỆU */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên tài liệu
            </label>
            <input
              type="text"
              disabled={isLocked}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`border px-3 py-2 rounded w-full ${
                isLocked ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Nhập tên tài liệu..."
            />
          </div>

          {/* LIST FOLDER */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Chọn thư mục
            </label>
            <select
              disabled={isLocked}
              value={folderId}
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

          {/* FILE UPLOAD */}
          <div>
            <label className="block text-sm font-medium mb-2">Chọn file</label>

            <label
              htmlFor="file-upload"
              className={`border-2 border-dashed p-6 rounded-xl text-center block cursor-pointer ${
                isLocked ? "cursor-not-allowed bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />

              {file ? (
                <span className="text-blue-700 font-medium">{file.name}</span>
              ) : (
                <span className="text-gray-500">Nhấn để chọn file</span>
              )}
            </label>

            <input
              disabled={isLocked}
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || isLocked}
            className={`w-full text-white py-2 rounded-lg text-lg transition ${
              isLocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang xử lý..." : "Tải lên tài liệu"}
          </button>
        </form>

        {/* ============================
            CỘT PHẢI – PREVIEW + STATUS
        ============================ */}
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

          {/* UPLOAD STATUS */}
          <div className="bg-white border rounded-xl shadow p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" /> Thông tin upload
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
              <li>• Chỉ nên upload file rõ nét</li>
              <li>• Chọn thư mục phù hợp để quản lý dễ hơn</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
