"use client";
import React from 'react';

interface SkillInputProps {
  id: string;
  skill: string;
  category: string;
  updateItem: (id: string, skill: string, category: string) => void;
}

const SkillInput: React.FC<SkillInputProps> = ({ id, skill, category, updateItem }) => {
  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, event.target.value, category);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, skill, event.target.value);
  };

  return (
    <div className="form-control flex flex-col md:flex-row gap-4">
      <input
        type="text"
        name="skill"
        value={skill}
        className="input input-bordered w-full text-black"
        placeholder="Enter a skill"
        onChange={handleSkillChange}
      />
      <input
        type="text"
        name="skill_category"
        value={category}
        className="input input-bordered w-full text-black"
        placeholder="Enter category"
        onChange={handleCategoryChange}
      />
    </div>
  );
};

export default SkillInput;