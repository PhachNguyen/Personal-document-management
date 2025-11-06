import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import HeaderHome from "../components/HeaderHome";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
            <HeaderHome />

            {/* === Hero Section === */}
            <section className="relative text-center py-24 px-6 border-b border-gray-800 bg-gradient-to-b from-gray-900 via-gray-950 to-black overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent)]"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        Liên hệ với chúng tôi
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình sử dụng{" "}
                        <span className="text-blue-400 font-medium">Personal Document Manager</span>.
                        Hãy gửi phản hồi hoặc yêu cầu để chúng tôi giúp bạn tốt hơn mỗi ngày.
                    </p>
                </div>

                <div className="relative mt-12">
                    <img
                        src="https://cdn.dribbble.com/userupload/12265996/file/original-bd72a0e739334f969a920f4964a570b2.png"
                        alt="Contact illustration"
                        className="w-full max-w-4xl mx-auto rounded-2xl border border-gray-800 shadow-2xl opacity-90"
                    />
                </div>
            </section>

            {/* === Quick Info Section === */}
            <section className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
                {[
                    {
                        icon: Mail,
                        title: "Email hỗ trợ",
                        desc: "Gửi mọi thắc mắc hoặc yêu cầu hỗ trợ cho đội ngũ của chúng tôi.",
                        info: "support@pdm.com",
                    },
                    {
                        icon: Phone,
                        title: "Hotline",
                        desc: "Liên hệ trực tiếp qua điện thoại trong giờ hành chính (8h - 17h).",
                        info: "+84 912 345 678",
                    },
                    {
                        icon: MapPin,
                        title: "Văn phòng",
                        desc: "Tầng 3, Toà N03T1, Khu Ngoại Giao Đoàn, Bắc Từ Liêm, Hà Nội.",
                        info: "Xem bản đồ bên dưới",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-md hover:shadow-blue-500/10 transition"
                    >
                        <item.icon className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
                        <p className="text-blue-400 font-medium">{item.info}</p>
                    </div>
                ))}
            </section>

            {/* === Contact Form + Image === */}
            <section className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* --- Form --- */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Cảm ơn bạn đã gửi liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
                    }}
                    className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-md space-y-6"
                >
                    <h2 className="text-2xl font-bold mb-4 text-blue-400">
                        Gửi tin nhắn cho chúng tôi
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Nhập họ và tên của bạn"
                            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 outline-none text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="Nhập địa chỉ email"
                            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 outline-none text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nội dung liên hệ
                        </label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Nhập nội dung liên hệ..."
                            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 outline-none text-gray-100 resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
                    >
                        <Send className="w-4 h-4" /> Gửi tin nhắn
                    </button>
                </form>

                {/* --- Image illustration --- */}
                <div className="relative">
                    <div className="absolute -inset-8 bg-blue-500/20 blur-3xl rounded-full"></div>
                    <img
                        src="https://cdn.dribbble.com/userupload/12024745/file/original-16db0b364e9427fda73a4ef1ebbf67a6.png"
                        alt="Support illustration"
                        className="relative rounded-2xl border border-gray-800 shadow-2xl object-cover w-full max-h-[450px]"
                    />
                </div>
            </section>

            {/* === Map or Office Image === */}
            <section className="py-20 bg-gray-900 border-t border-b border-gray-800">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-blue-400">
                        Văn phòng của chúng tôi
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Đến trực tiếp văn phòng để được hỗ trợ, gặp gỡ đội ngũ hoặc trao đổi hợp tác.
                    </p>

                    {/* Ảnh bản đồ minh họa */}
                    <img
                        src="https://placehold.co/1000x400/0f172a/60a5fa?text=Map+or+Office+Location"
                        alt="Office Map"
                        className="w-full max-w-5xl mx-auto rounded-xl border border-gray-800 shadow-md"
                    />
                </div>
            </section>

            {/* === CTA Section === */}
            <section className="py-20 text-center bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
                <MessageSquare className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-4">
                    Cần hỗ trợ ngay? Chúng tôi luôn sẵn sàng!
                </h3>
                <p className="text-gray-400 mb-8">
                    Gọi hotline hoặc gửi email để nhận hỗ trợ nhanh chóng từ đội ngũ chuyên viên của chúng tôi.
                </p>
                <Link
                    to="/register"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
                >
                    Liên hệ ngay
                </Link>
            </section>

            {/* === Footer === */}
            <Footer />
        </div>
    );
}
