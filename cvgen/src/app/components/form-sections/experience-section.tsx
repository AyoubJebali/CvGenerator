import React, { useState } from "react";
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

    const [items, setItems] = useState<Item[]>([]);
    const { data, setData } = useCv();
    const addToArray = () => {
        const newItem: Item = { id: uuidv4(), position: '', company: '',  start: '', end: '', details: '' };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const deleteItem = (id: string) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
        //Update the context data as well
        
        setData({ ...data, experiences: items.filter(item => item.id !== id).map(item =>({
            position: item.position,
            company: item.company,
            start: item.start,
            end: item.end,
            details: item.details.split('\n').map(line => line.trim()).filter(line => line !== '')
        })) });
    };

    const updateItem = (id: string, position: string, company:string, start: string, end: string, details: string) => {
        setItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, position , company, start, end, details } : item
            )
        );
        //Update the context data as well
        
        const updatedExperiences = items.map(item =>({
            position: item.position,
            company: item.company,
            start: item.start,
            end: item.end,
            details: item.details.split('\n').map(line => line.trim()).filter(line => line !== '')
        }));
        setData({ ...data, experiences: updatedExperiences });
    };
    return (
        <div className="collapse collapse-arrow bg-base-200 rounded-lg">
            <input type="checkbox" name="projects-accordion" />
            <div className="text-black collapse-title text-xl font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase-icon lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                Experience
            </div>
            <div className="collapse-content">
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 border border-base-300 rounded-lg">
                            <ExperienceInput
                                id={item.id}
                                position={item.position}
                                company={item.company}
                                start={item.start}
                                end={item.end}
                                details={item.details}
                                updateItem={updateItem}
                            />
                            <div className="text-right mt-2">
                                <button
                                    className="btn btn-outline btn-error btn-sm"
                                    type="button"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-right mt-4">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={addToArray}
                    >
                        Add Experience
                    </button>
                </div>
            </div>
        </div>
    );
}