export default function FolderCard({ title, desc, color, count }) {
    return (
        <div className={`p-4 rounded-xl text-white ${color} shadow-sm`}>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm opacity-80 mb-2">{desc}</p>
            <span className="text-xs bg-white/30 px-2 py-0.5 rounded">
                {count} Documents
            </span>
        </div>
    );
}
