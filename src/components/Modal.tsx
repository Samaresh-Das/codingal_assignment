interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ onConfirm, onCancel }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-800">End Class</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to end the class?
        </p>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            End Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
