import React, { useState } from "react";
import { createUserResume } from "@/app/dashboard/actions";
import { ResumeSchema } from "@/types";

interface CreateResumeModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onResumeCreated: () => void; // Callback to refresh resumes after creation
}

const emptyCvData: ResumeSchema = {
  name: "",
  title: "",
  contact: {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  about: "",
  skills: [],
  languages: [],
  hobbies: [],
  objectives: "",
  projects: [],
  studies_training: [],
  experiences: [],
};

const CreateResumeModal: React.FC<CreateResumeModalProps> = ({
  userId,
  isOpen,
  onClose,
  onResumeCreated,
}) => {
  const [newResumeName, setNewResumeName] = useState("");

  const handleCreateResume = async () => {
    try {
      await createUserResume(userId, newResumeName);
      onResumeCreated(); // Refresh resumes after creation
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error creating resume:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Resume</h2>
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded-md p-2 mb-4"
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