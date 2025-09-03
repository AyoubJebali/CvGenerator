"use client";
import React from 'react';

interface StudyInputProps {
  id: string;
  start: string;
  end: string;
  degree: string;
  institution: string;
  honors: string;
  updateItem: (id: string, start: string, end: string, degree: string, institution: string, honors: string) => void;
}

const StudyInput: React.FC<StudyInputProps> = ({ id, start, end, degree, institution, honors, updateItem }) => {
  const handleInputChange = (field: keyof Omit<StudyInputProps, 'id' | 'updateItem'>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(
      id,
      field === 'start' ? event.target.value : start,
      field === 'end' ? event.target.value : end,
      field === 'degree' ? event.target.value : degree,
      field === 'institution' ? event.target.value : institution,
      field === 'honors' ? event.target.value : honors
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="date"
        name="study_start"
        value={start}
        className="input input-bordered w-full text-black"
        placeholder="Start date"
        onChange={handleInputChange('start')}
      />
      <input
        type="date"
        name="study_end"
        value={end}
        className="input input-bordered w-full text-black"
        placeholder="End date"
        onChange={handleInputChange('end')}
      />
      <input
        type="text"
        name="study_degree"
        value={degree}
        className="input input-bordered w-full text-black"
        placeholder="e.g., Bachelor's degree"
        onChange={handleInputChange('degree')}
      />
      <input
        type="text"
        name="study_institution"
        value={institution}
        className="input input-bordered w-full text-black"
        placeholder="e.g., University of Anytown"
        onChange={handleInputChange('institution')}
      />
      <input
        type="text"
        name="study_honors"
        value={honors}
        className="input input-bordered w-full text-black"
        placeholder="e.g., Graduated with Honors"
        onChange={handleInputChange('honors')}
      />
    </div>
  );
};

export default StudyInput;
