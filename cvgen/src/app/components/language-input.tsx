"use client";
import React from 'react';

interface LanguageInputProps {
  id: string;
  language: string;
  proficiency: string;
  updateItem: (id: string, language: string, proficiency: string) => void;
}

const LanguageInput: React.FC<LanguageInputProps> = ({ id, language, proficiency, updateItem }) => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, event.target.value, proficiency);
  };

  const handleProficiencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, language, event.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        name="language"
        value={language}
        className="input input-bordered w-full text-black"
        placeholder="Enter a language"
        onChange={handleLanguageChange}
      />
      <input
        type="text"
        name="proficiency"
        value={proficiency}
        className="input input-bordered w-full text-black"
        placeholder="e.g., Proficient, Native"
        onChange={handleProficiencyChange}
      />
    </div>
  );
};

export default LanguageInput;
