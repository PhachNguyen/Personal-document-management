import AppLayout from "../layout/AppLayout";
import { BellRing } from "lucide-react";

export default function Notifications() {
    const notifications = [
        { id: 1, message: "CCCD sắp hết hạn vào 10/12/2025", date: "2025-11-06" },
        { id: 2, message: "Bằng lái xe sẽ hết hạn vào 30/11/2025", date: "2025-11-04" },
    ];

    return (
        <AppLayout>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-blue-600" /> Thông báo
            </h2>

            <div className="space-y-3">
                {notifications.map((n) => (
                    <div key={n.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-700">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
