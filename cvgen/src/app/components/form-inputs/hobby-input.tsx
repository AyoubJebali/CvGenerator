"use client";
import React from 'react';

interface HobbyInputProps {
  id: string;
  hobby: string;
  updateItem: (id: string, hobby: string) => void;
}

const HobbyInput: React.FC<HobbyInputProps> = ({ id, hobby, updateItem }) => {
  const handleHobbyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, event.target.value);
  };

  return (
    <div className="form-control">
      <input
        type="text"
        name="hobby"
        value={hobby}
        className="input input-bordered w-full text-black"
        placeholder="Enter a hobby"
        onChange={handleHobbyChange}
      />
    </div>
  );
};

export default HobbyInput;
