export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <span className="text-white text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );
} 