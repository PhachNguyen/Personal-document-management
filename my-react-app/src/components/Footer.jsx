import { Mail, Phone, MapPin, Facebook, Linkedin, Github, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
                {/* === Brand & Description === */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-6 h-6 text-blue-500" />
                        <h2 className="text-xl font-bold text-white">Personal Document Manager</h2>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Giải pháp lưu trữ và quản lý giấy tờ cá nhân một cách thông minh, bảo mật và tiện lợi —
                        giúp bạn yên tâm quản lý mọi tài liệu trong một nền tảng duy nhất.
                    </p>
                </div>

                {/* === Quick Links === */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Liên kết nhanh</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/" className="hover:text-blue-400 transition">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/features" className="hover:text-blue-400 transition">Tính năng</Link>
                        </li>
                        <li>
                            <Link to="/guide" className="hover:text-blue-400 transition">Hướng dẫn</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-blue-400 transition">Liên hệ</Link>
                        </li>
                    </ul>
                </div>

                {/* === Contact Info === */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Thông tin liên hệ</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <a href="mailto:support@pdm.com" className="hover:text-blue-400 transition">
                                support@pdm.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-500" />
                            <span>+84 912 345 678</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>Toà N03T1, Bắc Từ Liêm, Hà Nội</span>
                        </li>
                    </ul>
                </div>

                {/* === Social Media === */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Kết nối với chúng tôi</h3>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">
                        Theo dõi để cập nhật các tính năng mới nhất của hệ thống.
                    </p>
                </div>
            </div>

            {/* === Bottom Bar === */}
            <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                <p>
                    © 2025 Personal Document Manager. Made with 💙 by{" "}
                    <span className="text-blue-400 font-medium">Phách</span>.
                </p>
                <p className="mt-1 text-gray-600">Mọi quyền được bảo lưu.</p>
            </div>
        </footer>
    );
}
