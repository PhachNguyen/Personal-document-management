import { FileText, UploadCloud, Layers, BellRing, Search, ShieldCheck } from "lucide-react";
import HeaderHome from "../components/HeaderHome";
import { Link } from "react-router-dom";

export default function Guide() {
    const steps = [
        {
            icon: UploadCloud,
            title: "Bước 1: Tải giấy tờ của bạn lên",
            desc: "Nhấn vào nút 'Tải lên' và chọn ảnh hoặc file PDF từ thiết bị. Ứng dụng sẽ tự động nhận dạng loại giấy tờ (CCCD, hộ chiếu, bằng lái...).",
            img: "https://placehold.co/600x350/1e293b/ffffff?text=Upload+Your+Documents",
        },
        {
            icon: Layers,
            title: "Bước 2: Phân loại & gắn nhãn",
            desc: "Hệ thống sẽ tự động sắp xếp các tài liệu theo nhóm. Bạn có thể tùy chỉnh, gắn tag hoặc thêm mô tả để quản lý dễ dàng hơn.",
            img: "https://placehold.co/600x350/0f172a/60a5fa?text=Categorize+Documents",
        },
        {
            icon: BellRing,
            title: "Bước 3: Theo dõi & nhận nhắc nhở",
            desc: "Xem thời hạn giấy tờ, được thông báo khi sắp hết hạn. Không còn quên ngày gia hạn hộ chiếu hay bằng lái xe nữa!",
            img: "https://placehold.co/600x350/111827/3b82f6?text=Smart+Reminders",
        },
    ];

    const tips = [
        "Bạn có thể chụp ảnh trực tiếp từ điện thoại để tải lên nhanh hơn.",
        "Các giấy tờ được mã hóa và lưu trữ an toàn trên hệ thống.",
        "Có thể chia sẻ tài liệu cho người thân, đồng nghiệp với quyền hạn tùy chỉnh.",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
            <HeaderHome />

            {/* === Hero Section === */}
            <section className="text-center py-20 px-6 border-b border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Hướng dẫn sử dụng
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Chỉ với 3 bước đơn giản, bạn có thể quản lý toàn bộ giấy tờ cá nhân của mình
                    một cách thông minh và an toàn.
                </p>
            </section>

            {/* === Steps Section === */}
            <section className="py-20 px-6 max-w-6xl mx-auto space-y-20">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Text */}
                        <div className="flex-1 space-y-4">
                            <step.icon className="w-10 h-10 text-blue-500" />
                            <h2 className="text-2xl font-semibold">{step.title}</h2>
                            <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                        </div>

                        {/* Image */}
                        <div className="flex-1">
                            <img
                                src={step.img}
                                alt={step.title}
                                className="rounded-xl shadow-xl border border-gray-800 object-cover"
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* === Tips Section === */}
            <section className="py-16 bg-gray-900 border-t border-b border-gray-800">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <ShieldCheck className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-6">Mẹo sử dụng hiệu quả</h2>
                    <ul className="text-gray-400 text-left space-y-3 max-w-md mx-auto list-disc list-inside">
                        {tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* === CTA Section === */}
            <section className="py-20 text-center bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
                <h3 className="text-3xl font-bold mb-4">
                    Bắt đầu quản lý giấy tờ của bạn ngay hôm nay
                </h3>
                <p className="text-gray-400 mb-8">
                    Đăng ký tài khoản miễn phí và khám phá nền tảng quản lý tài liệu hiện đại.
                </p>
                <Link
                    to="/register"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
                >
                    Bắt đầu ngay
                </Link>
            </section>

            {/* === Footer === */}
            <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-800 bg-gray-950">
                © 2025 Personal Document Manager. Made with 💙 by Phách.
            </footer>
        </div>
    );
}
