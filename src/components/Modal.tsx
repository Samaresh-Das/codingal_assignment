import { useState } from "react";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ onConfirm, onCancel }: ModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [subReason, setSubReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
    setSubReason(null);
    setOtherReason("");
  };

  const handleSubReasonChange = (reason: string) => {
    setSubReason(reason);
    setOtherReason("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96">
        <h2 className="text-2xl font-bold text-gray-700">
          Select a reason to end class
        </h2>
        <div className="mt-4 space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedReason === "completed"}
              onChange={() => handleReasonChange("completed")}
              className="hidden"
            />
            <span
              className={`w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-full transition-all ${
                selectedReason === "completed"
                  ? "bg-orange-500 border-orange-500"
                  : "bg-white"
              }`}
            >
              {selectedReason === "completed" && (
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              )}
            </span>
            <span>Class completed</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedReason === "interrupted"}
              onChange={() => handleReasonChange("interrupted")}
              className="hidden"
            />
            <span
              className={`w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-full transition-all ${
                selectedReason === "interrupted"
                  ? "bg-orange-500 border-orange-500"
                  : "bg-white"
              }`}
            >
              {selectedReason === "interrupted" && (
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              )}
            </span>
            <span>Class interrupted or aborted</span>
          </label>
        </div>

        {/* Sub-reasons for "Class interrupted" */}
        {selectedReason === "interrupted" && (
          <div
            className={`ml-4 mt-4 transition-all duration-300 ease-in-out space-y-2 `}
          >
            {[
              "student-absent",
              "student-not-interested",
              "student-technical",
              "network",
              "other",
            ].map((sub, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={subReason === sub}
                  onChange={() => handleSubReasonChange(sub)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-full transition-all ${
                    subReason === sub
                      ? "bg-orange-500 border-orange-500"
                      : "bg-white"
                  }`}
                >
                  {subReason === sub && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </span>
                <span>
                  {sub === "student-absent" &&
                    "Student didn't show up for the class"}
                  {sub === "student-not-interested" &&
                    "Student didn't show any interest"}
                  {sub === "student-technical" && "Student got disconnected"}
                  {sub === "network" && "I got disconnected"}
                  {sub === "other" && "Other reason"}
                </span>
              </label>
            ))}

            {subReason === "other" && (
              <textarea
                placeholder="Enter reason..."
                className="w-full mt-2 p-2 border rounded-md"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            )}
          </div>
        )}

        <div className="flex justify-start space-x-3 mt-4 mx-5">
          <button
            className="bg-[#f35742] w-3/5 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            End Class
          </button>
          <button
            className="bg-gray-300 w-3/5 text-gray-700 px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
