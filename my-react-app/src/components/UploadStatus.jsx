import { useEffect, useState } from "react";
import {
  getUploadCount,
  getExtraUploads,
  buySlots,
} from "../blockchain/web3Provider";
import { ethers } from "ethers";
import { toast } from "sonner";
import { Upload, PlusCircle } from "lucide-react";

export default function UploadStatus() {
  const [used, setUsed] = useState(0);
  const [extra, setExtra] = useState(0);
  const [loading, setLoading] = useState(false);

  const FREE_LIMIT = 2;

  // 🟢 Load dữ liệu từ Smart Contract
  async function loadData() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const usedCount = Number(await getUploadCount(address));
      const extraCount = Number(await getExtraUploads(address));

      setUsed(usedCount);
      setExtra(extraCount);
    } catch (err) {
      toast.error("Không thể tải dữ liệu upload");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // 🟢 Mua thêm slot
  async function handleBuySlots() {
    try {
      setLoading(true);
      toast.info("Đang mở MetaMask…");

      await buySlots(5);

      toast.success("Mua thêm 5 lượt upload thành công!");
      loadData();
    } catch (err) {
      toast.error("Lỗi giao dịch: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const total = FREE_LIMIT + extra;
  const remaining = total - used;
  const percent = Math.min((used / total) * 100, 100);

  return (
    <div className="w-full bg-white border rounded-xl p-5 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Trạng thái Upload
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Đã dùng</p>
          <p className="font-semibold text-gray-800">{used}</p>
        </div>

        <div>
          <p className="text-gray-500">Miễn phí</p>
          <p className="font-semibold text-gray-800">{FREE_LIMIT}</p>
        </div>

        <div>
          <p className="text-gray-500">Mua thêm</p>
          <p className="font-semibold text-blue-600">{extra}</p>
        </div>

        <div>
          <p className="text-gray-500">Còn lại</p>
          <p className="font-semibold text-green-600">
            {remaining < 0 ? 0 : remaining}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {used}/{total} lượt đã sử dụng
        </p>
      </div>

      {/* Upgrade button */}
      <button
        onClick={handleBuySlots}
        disabled={loading}
        className={`mt-5 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
      >
        <PlusCircle className="w-4 h-4" />
        {loading ? "Đang mua..." : "Mua thêm 5 lượt (0.005 ETH)"}
      </button>
    </div>
  );
}
