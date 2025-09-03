import React from 'react';
import { useCv } from "../CvContext";
export default function ObjectivesSection() {
  const { data, setData } = useCv();
  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="objectives-accordion" />
      <div className="text-black collapse-title text-xl font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crosshair-icon lucide-crosshair"><circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/></svg>
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
