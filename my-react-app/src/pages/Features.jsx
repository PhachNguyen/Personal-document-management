import { ShieldCheck, UploadCloud, BellRing, Layers, Search, FileText, Share2, Lock } from "lucide-react";
import HeaderHome from "../components/HeaderHome";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Features() {
    const coreFeatures = [
        {
            icon: FileText,
            title: "Quản lý tập trung",
            desc: "Tất cả tài liệu của bạn được lưu trữ trong một hệ thống thống nhất, dễ truy cập từ mọi thiết bị.",
        },
        {
            icon: UploadCloud,
            title: "Tải lên dễ dàng",
            desc: "Hỗ trợ tải ảnh, file PDF hoặc quét trực tiếp từ thiết bị di động của bạn.",
        },
        {
            icon: Layers,
            title: "Phân loại thông minh",
            desc: "Hệ thống tự động nhận diện và nhóm giấy tờ theo loại, giúp việc tìm kiếm dễ dàng hơn.",
        },
    ];

    const secureFeatures = [
        {
            icon: ShieldCheck,
            title: "Mã hóa dữ liệu",
            desc: "Toàn bộ tài liệu được mã hóa trước khi lưu trữ, đảm bảo chỉ bạn mới có quyền truy cập.",
        },
        {
            icon: Lock,
            title: "Xác thực người dùng",
            desc: "Bảo vệ tài khoản bằng OTP hoặc đăng nhập Google, đảm bảo an toàn tuyệt đối.",
        },
        {
            icon: BellRing,
            title: "Cảnh báo và nhắc hạn",
            desc: "Hệ thống tự động gửi thông báo khi giấy tờ sắp hết hạn, giúp bạn không bỏ lỡ bất kỳ điều gì.",
        },
    ];

    const convenienceFeatures = [
        {
            icon: Search,
            title: "Tìm kiếm nhanh",
            desc: "Nhập vài ký tự để tìm ngay tài liệu bạn cần trong hàng trăm file.",
        },
        {
            icon: Share2,
            title: "Chia sẻ an toàn",
            desc: "Gửi tài liệu cho người thân hoặc đồng nghiệp với quyền hạn tùy chỉnh.",
        },
        {
            icon: BellRing,
            title: "Thông báo hoạt động",
            desc: "Theo dõi hoạt động tải lên, chia sẻ, chỉnh sửa trong thời gian thực.",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
            <HeaderHome />

            {/* === Hero Section === */}
            <section className="text-center py-20 px-6 border-b border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Tính năng nổi bật
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Hệ thống giúp bạn quản lý, bảo mật và truy cập mọi giấy tờ cá nhân dễ dàng, mọi lúc, mọi nơi.
                </p>
            </section>

            {/* === Core Features === */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-10 text-center text-blue-400">
                    ⚙️ Tính năng cốt lõi
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreFeatures.map((f, i) => (
                        <div
                            key={i}
                            className="p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-500 transition"
                        >
                            <f.icon className="w-8 h-8 text-blue-500 mb-3" />
                            <h4 className="text-lg font-semibold mb-2">{f.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* === Security Features === */}
            <section className="py-20 px-6 max-w-6xl mx-auto bg-gray-900/50 border-y border-gray-800">
                <h2 className="text-2xl font-bold mb-10 text-center text-blue-400">
                    🔒 Bảo mật & An toàn
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {secureFeatures.map((f, i) => (
                        <div
                            key={i}
                            className="p-6 bg-gray-950 border border-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-500 transition"
                        >
                            <f.icon className="w-8 h-8 text-blue-500 mb-3" />
                            <h4 className="text-lg font-semibold mb-2">{f.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* === Convenience Features === */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-10 text-center text-blue-400">
                    💡 Tiện ích mở rộng
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {convenienceFeatures.map((f, i) => (
                        <div
                            key={i}
                            className="p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-500 transition"
                        >
                            <f.icon className="w-8 h-8 text-blue-500 mb-3" />
                            <h4 className="text-lg font-semibold mb-2">{f.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* === CTA Section === */}
            <section className="py-20 text-center border-t border-gray-800 bg-gradient-to-b from-gray-950 to-black">
                <h3 className="text-3xl font-bold mb-4">
                    Sẵn sàng trải nghiệm quản lý giấy tờ hiện đại?
                </h3>
                <p className="text-gray-400 mb-8">
                    Tạo tài khoản miễn phí và bắt đầu chỉ trong vài phút.
                </p>
                <Link
                    to="/register"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
                >
                    Bắt đầu ngay
                </Link>
            </section>

            {/* === Footer === */}
            <Footer />
        </div>
    );
}
