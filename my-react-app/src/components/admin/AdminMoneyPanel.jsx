import { useEffect, useState } from "react";
import { Wallet, ArrowDownToLine } from "lucide-react";
import {
  getAdminAddress,
  getContractBalance,
  withdrawAll,
} from "../../blockchain/web3Provider";

export default function AdminMoneyPanel() {
  const [balance, setBalance] = useState("0");
  const [currentAccount, setCurrentAccount] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // "info" | "success" | "error"

  // Load thông tin ban đầu
  useEffect(() => {
    async function load() {
      try {
        if (!window.ethereum) {
          setMessage("⚠️ Chưa cài MetaMask");
          setMessageType("error");
          return;
        }

        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(account);

        const admin = await getAdminAddress();
        setAdminAddress(admin);

        const b = await getContractBalance();
        setBalance(b);

        if (account.toLowerCase() !== admin.toLowerCase()) {
          setMessage(
            "Bạn không phải admin – chỉ xem được số dư, không rút được."
          );
          setMessageType("info");
        }
      } catch (err) {
        setMessage("Lỗi tải dữ liệu: " + (err.message || "Unknown"));
        setMessageType("error");
      }
    }

    load();
  }, []);

  const isAdmin =
    currentAccount &&
    adminAddress &&
    currentAccount.toLowerCase() === adminAddress.toLowerCase();

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setMessage("Đang gửi giao dịch rút tiền...");
      setMessageType("info");

      await withdrawAll();

      setMessage("✅ Rút tiền thành công! Đợi 1 chút để số dư cập nhật.");
      setMessageType("success");

      const b = await getContractBalance();
      setBalance(b);
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi rút tiền: " + (err.data?.message || err.message));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">
            Quản lý dòng tiền
          </h3>
        </div>
        <span className="text-xs text-gray-400">
          Admin:{" "}
          <span className="font-mono">
            {adminAddress
              ? `${adminAddress.slice(0, 6)}...${adminAddress.slice(-4)}`
              : "Đang tải..."}
          </span>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">
            Số dư hiện tại trong contract:
          </p>
          <p className="text-2xl font-bold text-emerald-400">
            {balance} <span className="text-sm text-gray-400">ETH</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Đây là số tiền người dùng đã trả khi mua lượt upload.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-2">
          <button
            onClick={handleWithdraw}
            disabled={!isAdmin || loading || balance === "0"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              !isAdmin || loading || balance === "0"
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 text-gray-900"
            }`}
          >
            <ArrowDownToLine className="w-4 h-4" />
            {loading ? "Đang rút..." : "Rút toàn bộ về ví Admin"}
          </button>

          <span className="text-xs text-gray-500">
            Tài khoản hiện tại:{" "}
            {currentAccount
              ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
              : "Chưa kết nối"}
          </span>
        </div>
      </div>

      {message && (
        <div
          className={`mt-4 text-xs rounded-md px-3 py-2 ${
            messageType === "success"
              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
              : messageType === "error"
              ? "bg-red-500/10 text-red-300 border border-red-500/30"
              : "bg-sky-500/10 text-sky-300 border border-sky-500/30"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
