import { Link } from "react-router-dom";
import {
    ShieldCheck,
    UploadCloud,
    BellRing,
    Layers,
    Search,
    FileText,
    ArrowRight,
} from "lucide-react";
import HeaderHome from "../components/HeaderHome";
import Footer from "../components/Footer";

export default function Home() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Bảo mật dữ liệu",
            desc: "Mã hóa và lưu trữ an toàn, chỉ bạn mới có quyền truy cập.",
        },
        {
            icon: UploadCloud,
            title: "Tải lên dễ dàng",
            desc: "Hỗ trợ file ảnh, PDF, hoặc quét trực tiếp từ thiết bị.",
        },
        {
            icon: BellRing,
            title: "Nhắc hạn tự động",
            desc: "Tự động cảnh báo khi giấy tờ sắp hết hạn.",
        },
        {
            icon: Layers,
            title: "Phân loại thông minh",
            desc: "Hệ thống tự động nhận dạng và nhóm giấy tờ.",
        },
        {
            icon: Search,
            title: "Tìm kiếm nhanh",
            desc: "Nhập vài ký tự là tìm ra giấy tờ cần thiết.",
        },
        {
            icon: FileText,
            title: "Quản lý tập trung",
            desc: "Tất cả giấy tờ được hiển thị trong một bảng điều khiển trực quan.",
        },
    ];

    const steps = [
        {
            step: "01",
            title: "Tải giấy tờ lên",
            desc: "Chụp ảnh hoặc tải file PDF từ thiết bị của bạn.",
        },
        {
            step: "02",
            title: "Phân loại & Gắn nhãn",
            desc: "Hệ thống nhận diện và phân loại tự động.",
        },
        {
            step: "03",
            title: "Nhận nhắc nhở & Quản lý",
            desc: "Theo dõi hạn sử dụng và nhận cảnh báo sớm.",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">

            {/* ==== Header ==== */}
            <HeaderHome />

            {/* ==== Hero Section ==== */}
            <section className="relative overflow-hidden bg-gray-950 text-gray-100">
                {/* --- Gradient overlay (ánh sáng nền) --- */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-black opacity-95"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 px-8 py-24 max-w-7xl mx-auto">
                    {/* === LEFT CONTENT === */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                            Quản lý giấy tờ cá nhân
                            {/* <span className="text-blue-500">thông minh</span>
                            <br className="hidden md:block" />
                            cho cuộc sống hiện đại */}
                        </h1>

                        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                            Dễ dàng lưu trữ và theo dõi các loại giấy tờ quan trọng của bạn — từ
                            căn cước công dân, hộ chiếu, bằng lái xe cho tới văn bằng, chứng chỉ —
                            tất cả được quản lý tập trung, bảo mật tuyệt đối và có thể truy cập
                            mọi lúc, mọi nơi.
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-blue-500/30"
                            >
                                Bắt đầu ngay
                            </Link>
                            <a
                                href="#features"
                                className="border border-gray-700 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                            >
                                Tìm hiểu thêm
                            </a>
                        </div>
                    </div>


                    {/* === RIGHT IMAGE === */}
                    <div className="flex-1 flex justify-center relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-10 bg-blue-500/20 blur-3xl rounded-full"></div>

                        <img
                            src="https://placehold.co/600x400/0f172a/60a5fa?text=App+Dashboard"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/600x400/1e293b/fff?text=Preview+Image";
                            }}
                            alt="Preview"
                            className="relative w-full max-w-lg rounded-2xl border border-gray-800 shadow-2xl object-cover object-center"
                        />
                    </div>
                </div>

                {/* --- bottom glowing line --- */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-70"></div>
            </section>


            {/* ==== Features ==== */}
            <section id="features" className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-6xl mx-auto px-8">
                    <h2 className="text-3xl font-bold text-center mb-14">
                        Tính năng nổi bật
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-primary-light transition bg-white dark:bg-gray-900 hover:bg-gradient-to-b hover:from-blue-50 hover:to-white dark:hover:from-gray-800 dark:hover:to-gray-900"
                            >
                                <f.icon className="w-8 h-8 text-primary mb-3" />
                                <h4 className="font-semibold text-lg mb-2">{f.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==== Steps ==== */}
            <section id="steps" className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto text-center px-8">
                    <h2 className="text-3xl font-bold mb-10">Cách hoạt động</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {steps.map((item) => (
                            <div
                                key={item.step}
                                className="p-6 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition"
                            >
                                <div className="text-primary font-extrabold text-3xl mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==== CTA ==== */}
            <section className="bg-primary text-white py-20 text-center">
                <h3 className="text-3xl font-bold mb-4">
                    Sẵn sàng bắt đầu quản lý giấy tờ của bạn?
                </h3>
                <p className="mb-8 text-blue-100">
                    Tạo tài khoản miễn phí và bắt đầu lưu trữ ngay hôm nay.
                </p>
                <Link
                    to="/register"
                    className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
                >
                    Đăng ký ngay <ArrowRight className="w-5 h-5" />
                </Link>
            </section>

            {/* ==== Footer ==== */}
            <Footer />
        </div>
    );
}
