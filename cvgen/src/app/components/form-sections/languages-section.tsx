"use client";
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import LanguageInputBase from '../form-inputs/language-input';
import { useCv } from "../CvContext";
interface Item {
  id: string;
  language: string;
  proficiency: string;
}

export default function LanguagesSection() {
  const [items, setItems] = useState<Item[]>([]);
  const { data, setData } = useCv();
  const MemoLanguageInput = useMemo(() => React.memo(LanguageInputBase), []);

  const generateId = () => {
    try {
      // @ts-ignore
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        // @ts-ignore
        return crypto.randomUUID();
      }
    } catch {}
    return Math.random().toString(36).slice(2);
  };

  // Initialize from context if languages exist
  useEffect(() => {
    if (Array.isArray(data?.languages) && data.languages.length) {
      const normalized = data.languages.map((l: any) => ({
        id: generateId(),
        language: l.language || '',
        proficiency: l.proficiency || '',
      }));
      setItems(normalized);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToArray = useCallback(() => {
    const newItem: Item = { id: generateId(), language: '', proficiency: '' };
    setItems((prevItems) => {
      const next = [...prevItems, newItem];
      setData((prev: any) => ({ ...prev, languages: next }));
      return next;
    });
  }, [setData]);

  const deleteItem = useCallback((id: string) => {
    setItems((prevItems) => {
      const next = prevItems.filter(item => item.id !== id);
      setData((prev: any) => ({ ...prev, languages: next }));
      return next;
    });
  }, [setData]);

  const updateItem = useCallback((id: string, language: string, proficiency: string) => {
    setItems((prevItems) => {
      const next = prevItems.map(item =>
        item.id === id ? { ...item, language, proficiency } : item
      );
      setData((prev: any) => ({ ...prev, languages: next }));
      return next;
    });
  }, [setData]);

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="languages-accordion" />
      <div className="text-black collapse-title text-xl font-medium">
        Languages
      </div>
      <div className="collapse-content">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-grow">
                <MemoLanguageInput
                  id={item.id}
                  language={item.language}
                  proficiency={item.proficiency}
                  updateItem={updateItem}
                />
              </div>
              <button
                className="btn btn-outline btn-error btn-sm"
                type="button"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={addToArray}
          >
            Add Language
          </button>
        </div>
      </div>
    </div>
  );
}
