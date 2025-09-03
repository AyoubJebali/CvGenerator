"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProjectInputBase from '../form-inputs/project-input';
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
  const { setData } = useCv();
  const ProjectInput = useMemo(() => React.memo(ProjectInputBase), []);
  const addToArray = useCallback(() => {
    const newItem: Item = { id: uuidv4(), title: '', start: '', end: '', details: '' };
    setItems((prevItems) => {
      const next = [...prevItems, newItem];
      setData((prev: any) => ({
        ...prev,
        projects: next.map(item => ({
          title: item.title,
          start: item.start,
          end: item.end,
          details: item.details.split('\n').map(line => line.trim()).filter(line => line !== '')
        }))
      }));
      return next;
    });
  }, [setData]);

  const deleteItem = useCallback((id: string) => {
    setItems((prevItems) => {
      const next = prevItems.filter(item => item.id !== id);
      setData((prev: any) => ({
        ...prev,
        projects: next.map(item => ({
          title: item.title,
          start: item.start,
          end: item.end,
          details: item.details.split('\n').map(line => line.trim()).filter(line => line !== ''),
        }))
      }));
      return next;
    });
  }, [setData]);

  const updateItem = useCallback((id: string, title: string, start: string, end: string, details: string) => {
    setItems((prevItems) => {
      const next = prevItems.map(item =>
        item.id === id ? { ...item, title, start, end, details } : item
      );
      setData((prev: any) => ({
        ...prev,
        projects: next.map(item => ({
          title: item.title,
          start: item.start,
          end: item.end,
          details: item.details.split('\n').map(line => line.trim()).filter(line => line !== ''),
        }))
      }));
      return next;
    });
  }, [setData]);

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="projects-accordion" />
      <div className="text-black collapse-title text-xl font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-open-icon lucide-folder-open"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
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
