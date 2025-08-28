import React from 'react';
import { useCv } from "../CvContext";
export default function ObjectivesSection() {
  const { data, setData } = useCv();
  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="objectives-accordion" />
      <div className="text-black collapse-title text-xl font-medium">
        Objectives
      </div>
      <div className="collapse-content">
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered w-full text-black"
            placeholder="What are your career objectives?"
            name="objectives"
            value={data.objectives || ''}
            onChange={(e) => setData({ ...data, objectives: e.target.value })}
            rows={4}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
