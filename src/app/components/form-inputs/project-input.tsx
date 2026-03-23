"use client";
import React from 'react';

interface ProjectInputProps {
  id: string;
  title: string;
  start: string;
  end: string;
  details: string;
  updateItem: (id: string, title: string, start: string, end: string, details: string) => void;
}

const ProjectInput: React.FC<ProjectInputProps> = ({ id, title, start, end, details, updateItem }) => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, event.target.value, start, end, details);
  };

  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, title, event.target.value, end, details);
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, title, start, event.target.value, details);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateItem(id, title, start, end, event.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="label">
        <span className="label-text">Project Title</span>
      </label>
      <input
        type="text"
        name="project_title"
        value={title}
        className="input input-bordered w-full border-outline-variant bg-surface-container-lowest text-on-surface"
        placeholder="Enter project title"
        onChange={handleTitleChange}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            name="project_start"
            value={start}
            className="input input-bordered w-full border-outline-variant bg-surface-container-lowest text-on-surface"
            placeholder="Start date"
            onChange={handleStartChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            type="date"
            name="project_end"
            value={end}
            className="input input-bordered w-full border-outline-variant bg-surface-container-lowest text-on-surface"
            placeholder="End date"
            onChange={handleEndChange}
          />
        </div>
      </div>
      <label className="label">
        <span className="label-text">Details</span>
      </label>
      <textarea
        name="project_details"
        value={details}
        className="textarea textarea-bordered min-h-[100px] w-full resize-vertical rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-secondary"
        placeholder="Describe your project, achievements, and technologies used. Put each detail on a new line."
        onChange={handleDetailsChange}
        rows={4}
      />
    </div>
  );
};

export default ProjectInput;
