"use client";
import React from 'react';

interface ProjectInputProps {
  id: string;
  period: string;
  details: string;
  updateItem: (id: string, period: string, details: string) => void;
}

const ProjectInput: React.FC<ProjectInputProps> = ({ id, period, details, updateItem }) => {
  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, event.target.value, details);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateItem(id, period, event.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="label">
        <span className="label-text">Period</span>
      </label>
      <input
        type="text"
        name="project_period"
        value={period}
        className="input input-bordered w-full text-black"
        placeholder="e.g., 2020 → 2022"
        onChange={handlePeriodChange}
      />
      <label className="label">
        <span className="label-text">Details</span>
      </label>
      <textarea
        name="project_details"
        value={details}
        className="textarea textarea-bordered w-full text-black"
        placeholder="Enter project details, one per line"
        onChange={handleDetailsChange}
        rows={4}
      />
    </div>
  );
};

export default ProjectInput;
