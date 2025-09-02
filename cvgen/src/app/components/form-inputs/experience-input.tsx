"use client";
import React from "react";

interface ExperienceInputProps {
    id: string;
    position: string;
    company: string;
    start: string;
    end: string;
    details: string;
    updateItem: (id: string, position: string, company: string, start: string, end: string, details: string) => void;
}

const ExperienceInput: React.FC<ExperienceInputProps> = ({ id, position, company, start, end, details, updateItem }) => {
    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateItem(id, event.target.value, company, start, end, details);
    };
    const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateItem(id, position, event.target.value, start, end, details);
    };
    const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateItem(id, position, company, event.target.value, end, details);
    };
    const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateItem(id, position, company, start, event.target.value, details);
    };
    const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateItem(id, position, company, start, end, event.target.value);
    };

    return (
        <div className="space-y-2">
            <label className="label">
                <span className="label-text">Position Title</span>
            </label>
            <input
                type="text"
                name="experience_position"
                value={position}
                className="input input-bordered w-full text-black"
                placeholder="Enter position title"
                onChange={handlePositionChange}
            />
            <label className="label">
                <span className="label-text">Company Name</span>
            </label>
            <input
                type="text"
                name="experience_company"
                value={company}
                className="input input-bordered w-full text-black"
                placeholder="Enter company name"
                onChange={handleCompanyChange}
            />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">
                        <span className="label-text">Start Date</span>
                    </label>
                    <input
                        type="date"
                        name="experience_start"
                        value={start}
                        className="input input-bordered w-full text-black"
                        placeholder="Start date"
                        onChange={handleStartChange}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">End Date</span>
                    </label>
                    <input
                        type="date"
                        name="experience_end"
                        value={end}
                        className="input input-bordered w-full text-black"
                        placeholder="End date"
                        onChange={handleEndChange}
                    />
                </div>
            </div>
            <label className="label">
                <span className="label-text">Details</span>
            </label>
            <textarea
                name="experience_details"
                value={details}
                className="textarea textarea-bordered w-full text-black bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all min-h-[100px] resize-vertical"
                placeholder="Describe your responsibilities, achievements, and technologies used..."
                onChange={handleDetailsChange}
            />
        </div>
    );
};

export default ExperienceInput;