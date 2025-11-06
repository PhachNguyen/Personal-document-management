import AppLayout from "../layout/AppLayout";
import FolderCard from "../components/FolderCard";
import DocumentCard from "../components/DocumentCard";

export default function Dashboard() {
    return (
        <AppLayout>
            {/* Thư mục */}
            <section>
                <div className="flex justify-between mb-3">
                    <h2 className="text-lg font-semibold">Thư mục</h2>
                    <button className="text-sm text-gray-500 hover:text-blue-600">Sắp xếp</button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FolderCard title="Dự án Keitoto" desc="Thiết kế và trình bày dự án sáng tạo." color="bg-violet-500" count={45} />
                    <FolderCard title="Design System Journal" desc="Phát triển hệ thống thiết kế." color="bg-teal-500" count={15} />
                    <FolderCard title="Marketing Mạng Xã Hội" desc="Chiến lược truyền thông & quảng bá." color="bg-sky-500" count={45} />
                    <FolderCard title="Kiểm thử khả dụng" desc="Đánh giá trải nghiệm người dùng." color="bg-orange-500" count={12} />
                </div>
            </section>

            {/* Tài liệu gần đây */}
            <section className="mt-10">
                <div className="flex justify-between mb-3">
                    <h2 className="text-lg font-semibold">Tài liệu gần đây</h2>
                    <button className="text-sm text-gray-500 hover:text-blue-600">Sắp xếp</button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DocumentCard title="Chiến lược Marketing" folder="Marketing" status="Đã phát hành" img="https://placehold.co/600x400" />
                    <DocumentCard title="Nghiên cứu UX" folder="UX Testing" status="Đang xử lý" img="https://placehold.co/600x400" />
                    <DocumentCard title="Dashboard Kollect" folder="Dự án Keitoto" status="Đang xử lý" img="https://placehold.co/600x400" />
                </div>
            </section>
        </AppLayout>
    );
}
