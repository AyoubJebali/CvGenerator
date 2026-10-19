import React, { useState } from "react";
import { createUserResume } from "@/app/dashboard/actions";

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeCreated: () => void; // Callback to refresh resumes after creation
}

const CreateResumeModal: React.FC<CreateResumeModalProps> = ({
  isOpen,
  onClose,
  onResumeCreated,
}) => {
  const [newResumeName, setNewResumeName] = useState("");

  const handleCreateResume = async () => {
    try {
      await createUserResume(newResumeName);
      onResumeCreated(); // Refresh resumes after creation
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error creating resume:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="modal w-full max-w-md rounded-lg bg-surface-container-lowest p-6">
        <h2 className="mb-4 text-xl font-bold text-on-surface">Create New Resume</h2>
        <input
          type="text"
          className="mb-4 w-full rounded-md border border-outline-variant bg-surface-container-high p-2 text-on-surface"
          placeholder="Enter resume name"
          value={newResumeName}
          onChange={(e) => setNewResumeName(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreateResume}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateResumeModal;
