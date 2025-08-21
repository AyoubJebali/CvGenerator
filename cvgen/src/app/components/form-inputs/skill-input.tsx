"use client";
import React from 'react';

interface SkillInputProps {
  id: string;
  skill: string;
  category: string;
  updateItem: (id: string, skill: string, category: string) => void;
}

const categories = [
  "Programming Languages",
  "Web Technologies",
  "Databases",
  "Tools & Frameworks"
];

const SkillInput: React.FC<SkillInputProps> = ({ id, skill, category, updateItem }) => {
  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, event.target.value, category);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select
        name="skill_category"
        value={category}
        className="select select-bordered w-full text-black"
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default SkillInput;