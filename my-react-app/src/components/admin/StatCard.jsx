export default function StatCard({ title, value, change, positive, icon: Icon }) {
    return (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-xl font-semibold">{value}</h3>
                <p className={`text-sm ${positive ? "text-green-600" : "text-red-500"}`}>
                    {positive ? "▲" : "▼"} {change}
                </p>
            </div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
