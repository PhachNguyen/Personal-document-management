import {
  User,
  ShieldCheck,
  Lock,
  Unlock,
  Wallet,
  ArrowDownToLine,
} from "lucide-react";

import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getAdminAddress,
  getContractBalance,
  withdrawAll,
} from "../../blockchain/web3Provider";

export default function AdminUsers() {
  const [balance, setBalance] = useState("0");
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [adminWallet, setAdminWallet] = useState("");

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a.nguyen@example.com",
      role: "Người dùng",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b.tran@example.com",
      role: "Người dùng",
      status: "Đã khóa",
    },
    {
      id: 3,
      name: "Phạm Minh C",
      email: "minh.c@example.com",
      role: "Quản trị viên",
      status: "Hoạt động",
    },
  ];

  // LOAD CONTRACT BALANCE
  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      setLoadingBalance(true);

      if (!window.ethereum) return toast.error("Chưa cài MetaMask!");

      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(account);

      const admin = await getAdminAddress();
      setAdminWallet(admin);

      const b = await getContractBalance();
      setBalance(b);
    } catch (err) {
      toast.error("Không thể tải số dư hợp đồng!");
    } finally {
      setLoadingBalance(false);
    }
  };

  // RÚT TIỀN
  const handleWithdraw = async () => {
    if (
      !currentAccount ||
      currentAccount.toLowerCase() !== adminWallet.toLowerCase()
    ) {
      return toast.error("❌ Bạn không phải admin!");
    }

    toast.info("⏳ Chờ xác nhận giao dịch trong MetaMask...");

    try {
      setWithdrawing(true);
      toast.loading("Đang xử lý rút tiền...", { id: "withdraw" });

      await withdrawAll();

      toast.success("💸 Rút tiền thành công!", { id: "withdraw" });

      const b = await getContractBalance();
      setBalance(b);
    } catch (err) {
      toast.error("Lỗi rút tiền: " + err.message, { id: "withdraw" });
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <AdminLayout>
      {/* TIÊU ĐỀ */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-blue-600" />
        Quản lý người dùng
      </h1>

      {/* 🔥 CARD SỐ DƯ + RÚT TIỀN */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
          <Wallet className="w-5 h-5 text-green-600" />
          Số dư hợp đồng (Smart Contract)
        </h3>

        <p className="text-gray-600 text-sm">Số dư hiện tại:</p>
        <p className="text-4xl font-bold text-green-600 mt-1">
          {loadingBalance ? "Loading..." : balance + " ETH"}
        </p>

        <p className="text-gray-400 text-xs mt-1">
          (Tiền người dùng mua lượt upload)
        </p>

        <button
          onClick={handleWithdraw}
          disabled={withdrawing || balance === "0"}
          className={`mt-4 px-5 py-2 flex items-center gap-2 rounded-lg text-white text-sm transition 
          ${
            balance === "0"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <ArrowDownToLine className="w-4 h-4" />
          {withdrawing ? "Đang rút..." : "Rút tiền về ví admin"}
        </button>
      </div>

      {/* TABLE USERS — GIAO DIỆN SÁNG */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-3 text-left">Tên</th>
              <th className="py-3 text-left">Email</th>
              <th className="py-3 text-left">Vai trò</th>
              <th className="py-3 text-left">Trạng thái</th>
              <th className="py-3 text-left">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 text-gray-700 transition"
              >
                <td className="py-3">{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.role === "Quản trị viên"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.status === "Hoạt động"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                <td className="flex items-center gap-3 py-2">
                  {u.status === "Hoạt động" ? (
                    <button className="text-red-500 hover:text-red-600 flex items-center gap-1">
                      <Lock className="w-4 h-4" /> Khóa
                    </button>
                  ) : (
                    <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
                      <Unlock className="w-4 h-4" /> Mở khóa
                    </button>
                  )}
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
