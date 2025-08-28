"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProjectInput from '../form-inputs/project-input';
import { useCv } from "../CvContext";

interface Item {
  id: string;
  title: string;
  start: string;
  end: string;
  details: string;
}

export default function ProjectsSection() {
  const [items, setItems] = useState<Item[]>([]);
  const { data, setData } = useCv();
  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), title: '', start: '', end: '', details: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
    // Update the context data as well
    setData({
      ...data, projects: items.filter(item => item.id !== id).map
        (item => ({
          title: item.title,
          start: item.start,
          end: item.end,
          details: item.details.split('\n').map(line => line.trim()).filter(line => line !== '')
        }))
    });
  };

  const updateItem = (id: string, title: string, start: string, end: string, details: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, title, start, end, details } : item
      )
    );
    // Update the context data as well
    const updatedProjects = items.map(item => ({
      title: item.title,
      start: item.start,
      end: item.end,
      details: item.details.split('\n').map(line => line.trim()).filter(line => line !== '')
    }));
    setData({ ...data, projects: updatedProjects });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="projects-accordion" />
      <div className="text-black collapse-title text-xl font-medium">
        Projects
      </div>
      <div className="collapse-content">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="p-4 border border-base-300 rounded-lg">
              <ProjectInput
                id={item.id}
                title={item.title}
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
            Add Project/Experience
          </button>
        </div>
      </div>
    </div>
  );
}
