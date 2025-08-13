import React from 'react';

export default function ObjectivesSection() {
  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="objectives-accordion" />
      <div className="text-black collapse-title text-xl font-medium">
        Objectives
      </div>
      <div className="collapse-content">
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="What are your career objectives?"
            name="objectives"
            rows={4}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
