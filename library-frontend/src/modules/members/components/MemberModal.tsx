interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const MemberModal = ({ isOpen, onClose, onConfirm }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-xl p-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Confirm Deletion
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this member? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg 
                       border border-gray-300 text-gray-700 
                       hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-lg 
                       bg-blue-600 text-white 
                       hover:bg-blue-700 active:scale-[0.98] 
                       transition-all duration-200 shadow-sm"
          >
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default MemberModal;