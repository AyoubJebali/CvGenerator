import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import ExperienceInput from "../form-inputs/experience-input";
import { useCv } from "../CvContext";

interface Item {
    id: string;
    position: string;
    company: string;
    start: string;
    end: string;
    details: string;
}

export default function ExperienceSection() {
    const { data, setData } = useCv();
    const [items, setItems] = useState<Item[]>([]);

    // Initialize items from context data
    useEffect(() => {
        const initialItems = (data.experiences || []).map((item) => ({
            id: uuidv4(),
            position: item.position || "",
            company: item.company || "",
            start: item.start || "",
            end: item.end || "",
            details: Array.isArray(item.details) ? item.details.join('\n') : (item.details || ""),
        }));
        setItems(initialItems);
    }, []);

    const addToArray = () => {
        const newItem: Item = { id: uuidv4(), position: '', company: '', start: '', end: '', details: '' };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const deleteItem = (id: string) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        setData({
            ...data,
            experiences: updatedItems.map(item => ({
                position: item.position,
                company: item.company,
                start: item.start,
                end: item.end,
                details: item.details.split('\n').map(line => line.trim()).filter(line => line !== '')
            }))
        });
    };

    const updateItem = (id: string, position: string, company: string, start: string, end: string, details: string) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, position, company, start, end, details } : item
        );
        setItems(updatedItems);
        setData({
            ...data,
            experiences: updatedItems.map(item => ({
                position: item.position,
                company: item.company,
                start: item.start,
                end: item.end,
                details: item.details.split('\n').map(line => line.trim()).filter(line => line !== '')
            }))
        });
    };

    return (
        <section className="editor-section p-5 md:p-7">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[34px] font-extrabold text-on-surface">Work Experience</h3>
                <button
                    className="editor-action-btn"
                    type="button"
                    onClick={addToArray}
                >
                    + Add Experience
                </button>
            </div>
            {items.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-high px-6 py-12 text-center">
                    <p className="text-3xl font-semibold text-on-surface">No experience added yet</p>
                    <p className="mt-2 text-lg text-on-surface-variant">Showcase your career highlights here.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                            <ExperienceInput
                                id={item.id}
                                position={item.position}
                                company={item.company}
                                start={item.start}
                                end={item.end}
                                details={item.details}
                                updateItem={updateItem}
                            />
                            <div className="mt-2 text-right">
                                <button
                                    className="rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                                    type="button"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
