import { useState } from "react";
import API from "../../api/axios"; // use env api

const RecordModal = ({ onClose }) => {
  const [recordedBlob, setRecordedBlob] = useState(null);

  const handleStop = (blob) => {
    setRecordedBlob(blob);
  };

  const handleSave = async () => {
    if (!recordedBlob) return;

    const formData = new FormData();
    formData.append("song", recordedBlob);
    formData.append("type", "recorded");

    try {
      await API.post("/songs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 grid place-items-center z-50">
      <div className="p-6 rounded-2xl bg-slate-900 w-96">

        <p className="text-lg font-semibold mb-4">🎙 Recording</p>

        {/* Mic wave animation inga podalaam */}

        {recordedBlob && (
          <p className="text-sm text-white/70">
            Save this recording?
          </p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            disabled={!recordedBlob}
            className="flex-1 py-2 rounded-lg bg-green-500 disabled:bg-gray-500"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-red-500"
          >
            Discard
          </button>
        </div>

      </div>
    </div>
  );
};

export default RecordModal;