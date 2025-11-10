export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="empty-state-message flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">🍽️</div>
      <p className="text-2xl font-bold text-[#424242] mb-2">No items available</p>
      <p className="text-lg text-[#757575]">{message}</p>
    </div>
  );
}
