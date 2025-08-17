import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ExperienceInput from "../experience-input";


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
    const addToArray = () => {
        const newItem: Item = { id: uuidv4(), position: '', company: '',  start: '', end: '', details: '' };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const deleteItem = (id: string) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const updateItem = (id: string, position: string, company:string, start: string, end: string, details: string) => {
        setItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, position , company, start, end, details } : item
            )
        );
    };
    return (
        <div className="collapse collapse-arrow bg-base-200 rounded-lg">
            <input type="checkbox" name="projects-accordion" />
            <div className="text-black collapse-title text-xl font-medium">
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