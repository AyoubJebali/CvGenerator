"use client";

import { useState } from "react";

type TemplateOption = {
    id: string;
    name: string;
    preview: string;
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
    const [selected, setSelected] = useState<string>("modern");

    const handleSelect = (id: string) => {
        setSelected(id);
        onSelect(id);
    };

    return (
        <div className="space-y-4 bg-base-100 p-4 rounded-xl shadow text-base-content">
            <h2 className="text-lg font-semibold">Choose a CV Template</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 max-h-[85vh] overflow-y-auto">
                {templates.map((tpl) => {
                    const isActive = selected === tpl.id;
                    return (
                        <div
                            key={tpl.id}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isActive}
                            onClick={() => handleSelect(tpl.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleSelect(tpl.id);
                            }}
                            className={`card bg-base-100 shadow-md hover:shadow-xl transition duration-200 border overflow-hidden 
                            ${isActive ? 'border-primary ring-2 ring-primary/30' : 'border-base-200 hover:border-base-300'}
                            `}
                        >
                            <div className="relative w-full bg-base-200">
                                <div className="relative w-full aspect-[3/4]">
                                    <img
                                        src={tpl.preview}
                                        alt={tpl.name}
                                        className="absolute inset-0 w-full h-full object-contain p-2"
                                    />
                                </div>
                                {isActive && (
                                    <div className="absolute top-2 right-2 badge badge-primary gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Selected
                                    </div>
                                )}
                            </div>
                            <div className="card-body p-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="card-title text-base">{tpl.name}</h3>
                                    <button
                                        className={`btn btn-xs ${isActive ? 'btn-primary' : 'btn-outline btn-primary'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(tpl.id);
                                        }}
                                    >
                                        Use
                                    </button>
                                </div>
                                <p className="text-xs opacity-70">Clean, ATS-friendly layout</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
