export default function AlertModal({ message, type = ["success", "info" ], onClose }) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white border rounded-xl p-6 w-full max-w-sm text-[#2b2b2b] ${styles[type]}`}
      >
        <p className="mb-4">{message}</p>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-[#2b2b2b] text-white"
        >
          OK
        </button>
      </div>
    </div>
  );
}
