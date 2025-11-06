import AppLayout from "../layout/AppLayout";
import DocumentCard from "../components/DocumentCard";
import { Search } from "lucide-react";

export default function Documents() {
    const docs = [
        { title: "CCCD", folder: "Cá nhân", status: "Đã phát hành", img: "https://placehold.co/600x400" },
        { title: "Bằng lái xe", folder: "Công việc", status: "Đang xử lý", img: "https://placehold.co/600x400" },
        { title: "Giấy khai sinh", folder: "Gia đình", status: "Đã phát hành", img: "https://placehold.co/600x400" },
    ];

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tài liệu của tôi</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="pl-9 pr-3 py-2 border rounded-md text-sm"
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.map((d, i) => <DocumentCard key={i} {...d} />)}
            </div>
        </AppLayout>
    );
}
