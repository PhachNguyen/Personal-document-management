import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import authApi from "../api/authApi";

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // handle change input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (formData.password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            setLoading(true);
            const res = await authApi.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            alert(res.data.message || "Đăng ký thành công!");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Đăng ký thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* === LEFT: Banner === */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 text-gray-100 flex flex-col justify-center px-12 py-16">
                <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-7 h-7 text-blue-400" />
                    <h1 className="text-2xl font-bold">PDM System</h1>
                </div>

                <h2 className="text-4xl font-extrabold leading-tight mb-6">
                    Bắt đầu quản lý{" "}
                    <span className="text-blue-400">giấy tờ cá nhân</span> của bạn ngay hôm nay
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Tạo tài khoản để sử dụng hệ thống lưu trữ thông minh, giúp bạn quản lý
                    tất cả tài liệu cá nhân an toàn và tiện lợi.
                </p>

                <ul className="space-y-2 text-sm text-gray-300">
                    <li>+ Giao diện dễ dùng</li>
                    <li>+ Lưu trữ đám mây an toàn</li>
                    <li>+ Tự động nhắc hạn giấy tờ</li>
                    <li>+ Dễ dàng tìm kiếm & chia sẻ</li>
                </ul>
            </div>

            {/* === RIGHT: Form === */}
            <div className="flex items-center justify-center bg-gray-50 relative">
                {/* 🔹 Nút quay lại */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay về trang chủ
                </Link>

                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Đăng ký để bắt đầu quản lý giấy tờ cá nhân
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Họ và tên */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Họ và tên
                            </label>
                            <div className="relative">
                                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Họ và tên của bạn"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                            </div>
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Xác nhận mật khẩu */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition ${loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-blue-600 font-medium hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
