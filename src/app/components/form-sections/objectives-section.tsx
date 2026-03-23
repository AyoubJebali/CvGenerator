import React from 'react';
import { useCv } from "../CvContext";
export default function ObjectivesSection() {
  const { data, setData } = useCv();
  return (
    <section className="editor-section p-5 md:p-7">
      <h3 className="mb-4 text-[34px] font-extrabold text-on-surface">Objectives</h3>
      <textarea
        className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface"
        placeholder="What are your career objectives?"
        name="objectives"
        value={data.objectives || ''}
        onChange={(e) => setData({ ...data, objectives: e.target.value })}
        rows={4}
      ></textarea>
    </section>
  );
}
