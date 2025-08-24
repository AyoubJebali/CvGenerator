"use client";

import { useState } from "react";

type TemplateOption = {
    id: string;
    name: string;
    preview: string; // could be an image or JSX
};

const templates: TemplateOption[] = [
    {
        id: "modern",
        name: "Modern",
        preview: "/templates/cvTest-1.png", // static preview image
    },
    {
        id: "classic",
        name: "Classic",
        preview: "/templates/classic-preview.png",
    },
    {
        id: "minimal",
        name: "Minimal",
        preview: "/templates/minimal-preview.png",
    },
];

export default function CVTemplateSelector({
    onSelect,
}: {
    onSelect: (templateId: string) => void;
}) {
    const [selected, setSelected] = useState<string>("");

    const handleSelect = (id: string) => {
        setSelected(id);
        onSelect(id);
    };

    return (
        <div className="space-y-4 bg-white p-4 rounded-lg shadow text-black">
            <h2 className="text-lg font-semibold">Choose a CV Template</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {templates.map((tpl) => (
                    <div
                        key={tpl.id}
                        onClick={() => handleSelect(tpl.id)}
                        className={`cursor-pointer rounded-xl border-2 overflow-hidden shadow transition 
              ${selected === tpl.id ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"}`}
                    >
                        {/* Preview Image */}
                        <img
                            src={tpl.preview}
                            alt={tpl.name}
                            className="w-full h-48 object-contain bg-gray-100"
                        />
                        {/* Template Name */}
                        <div className="p-2 text-center font-medium">{tpl.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
