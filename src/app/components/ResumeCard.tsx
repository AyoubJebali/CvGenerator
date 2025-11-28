import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface ResumeCardProps {
  title: string;
  editedDaysAgo: number;
  imageSrc: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ title, editedDaysAgo, imageSrc }) => {
  return (
    <div className="resume-card bg-white shadow-md rounded-lg p-4 w-full sm:w-64 flex flex-col items-center gap-4">
      <div className="resume-preview w-full h-full bg-gray-300 rounded-md overflow-hidden">
        <img
          src={imageSrc}
          alt={`${title} Preview`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="resume-details text-center">
        <h2 className="text-sm md:text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-xs md:text-sm">Edited {editedDaysAgo} days ago - A4</p>
      </div>
      <div className="resume-actions flex gap-2">
        <button className="text-blue-500 hover:text-blue-600 transition">
          <FaEye size={16} />
        </button>
        <button className="text-gray-500 hover:text-gray-600 transition">
          <FaEdit size={16} />
        </button>
        <button className="text-red-500 hover:text-red-600 transition">
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;