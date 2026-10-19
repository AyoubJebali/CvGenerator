import React from "react";
import SkillInput from "../form-inputs/skill-input";
import { useCv } from "../CvContext";

export default function SkillSection() {
  const { data, setData } = useCv();
  const items = (Array.isArray(data.skills) ? data.skills : []).map((item) => ({
    skill: item.skill ?? "",
    category: item.category ?? "",
  }));

  const addToArray = () => {
    setData((prev) => ({
      ...prev,
      skills: [...(Array.isArray(prev.skills) ? prev.skills : []), { skill: "", category: "" }],
    }));
  };

  const deleteItem = (id: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;

    setData((prev) => ({
      ...prev,
      skills: (Array.isArray(prev.skills) ? prev.skills : []).filter((_, idx) => idx !== index),
    }));
  };

  const updateItem = (id: string, newSkill: string, newCategory: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;

    setData((prev) => ({
      ...prev,
      skills: (Array.isArray(prev.skills) ? prev.skills : []).map((item, idx) =>
        idx === index ? { ...item, skill: newSkill, category: newCategory } : item
      ),
    }));
  };

  return (
    <section className="editor-section p-5 md:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[34px] font-extrabold text-on-surface">Skills & Expertise</h3>
        <button
          className="editor-action-btn"
          type="button"
          onClick={addToArray}
        >
          + Add Skill
        </button>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-high px-6 py-10 text-center">
            <p className="text-2xl font-medium text-on-surface-variant">Add technical and soft skills</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={`skill-${index}`} className="flex items-center gap-4">
              <div className="flex-grow">
                <SkillInput
                  id={`${index}`}
                  skill={item.skill}
                  category={item.category}
                  updateItem={updateItem}
                />
              </div>
              <button
                className="rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                type="button"
                onClick={() => deleteItem(`${index}`)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
