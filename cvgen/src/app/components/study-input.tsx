"use client";
import React from 'react';

interface StudyInputProps {
  id: string;
  period: string;
  degree: string;
  institution: string;
  honors: string;
  updateItem: (id: string, period: string, degree: string, institution: string, honors: string) => void;
}

const StudyInput: React.FC<StudyInputProps> = ({ id, period, degree, institution, honors, updateItem }) => {
  const handleInputChange = (field: keyof Omit<StudyInputProps, 'id' | 'updateItem'>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id,
      field === 'period' ? event.target.value : period,
      field === 'degree' ? event.target.value : degree,
      field === 'institution' ? event.target.value : institution,
      field === 'honors' ? event.target.value : honors
    );
  };

  return (
    <div className="form-control mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="study_period"
          value={period}
          className="input input-bordered w-full bg-white"
          placeholder="e.g., 2019 → 2020"
          onChange={handleInputChange('period')}
        />
        <input
          type="text"
          name="study_degree"
          value={degree}
          className="input input-bordered w-full bg-white"
          placeholder="e.g., Bachelor's degree in Computer Science"
          onChange={handleInputChange('degree')}
        />
        <input
          type="text"
          name="study_institution"
          value={institution}
          className="input input-bordered w-full bg-white"
          placeholder="e.g., University of Anytown"
          onChange={handleInputChange('institution')}
        />
        <input
          type="text"
          name="study_honors"
          value={honors}
          className="input input-bordered w-full bg-white"
          placeholder="e.g., Graduated with Honors"
          onChange={handleInputChange('honors')}
        />
      </div>
    </div>
  );
};

export default StudyInput;
