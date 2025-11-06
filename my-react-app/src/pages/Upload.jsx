import AppLayout from "../layout/AppLayout";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

export default function Upload() {
    const [file, setFile] = useState(null);

    return (
        <AppLayout>
            <h2 className="text-lg font-semibold mb-6">Tải lên tài liệu mới</h2>
            <form className="bg-white border rounded-xl p-6 shadow-sm space-y-4 max-w-xl">
                <div>
                    <label className="block text-sm font-medium mb-1">Tên tài liệu</label>
                    <input type="text" placeholder="Nhập tên tài liệu..." className="border w-full px-3 py-2 rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Ngày hết hạn</label>
                    <input type="date" className="border w-full px-3 py-2 rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Chọn file</label>
                    <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-md">
                        <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file-upload" className="text-blue-600 cursor-pointer hover:underline">
                            {file ? file.name : "Nhấn để chọn tệp"}
                        </label>
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Tải lên
                </button>
            </form>
        </AppLayout>
    );
}
