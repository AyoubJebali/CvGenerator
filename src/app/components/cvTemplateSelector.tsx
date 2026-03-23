"use client";

import { useMemo } from "react";
import Image from "next/image";

type TemplateOption = {
  id: string;
  name: string;
  preview: string;
  description: string;
};

const templates: TemplateOption[] = [
  {
    id: "OneColumn",
    name: "One Column",
    preview: "/templates/OneColumn.png",
    description: "Classic, ATS-safe and balanced for most roles.",
  },
  {
    id: "HeaderBanner",
    name: "Header Banner",
    preview: "/templates/HeaderBanner.png",
    description: "Strong top identity section and modern hierarchy.",
  },
  {
    id: "SidebarDark",
    name: "Sidebar Dark",
    preview: "/templates/SidebarDark.png",
    description: "Bold sidebar layout for design-forward profiles.",
  },
  {
    id: "TwoColumn",
    name: "Two Column",
    preview: "/templates/TwoColumn.png",
    description: "Dense but clean split layout for rich content.",
  },
];

export default function CVTemplateSelector({
  onSelect,
  selected,
}: {
  onSelect: (templateId: string) => void;
  selected: string;
}) {
  const activeTemplate = useMemo(
    () => templates.find((tpl) => tpl.id === selected) ?? templates[0],
    [selected]
  );

  return (
    <details className="dropdown dropdown-end">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-on-surface shadow-sm marker:content-['']">
        <span className="text-on-surface-variant">Switch Template</span>
        <span className="rounded-md bg-surface-container-high px-2 py-1 text-xs text-on-surface">
          {activeTemplate.name}
        </span>
      </summary>

      <div className="dropdown-content z-30 mt-2 w-[360px] rounded-2xl border border-outline-variant bg-surface-container-low p-3 shadow-a4">
        <p className="mb-2 px-1 text-xs font-semibold tracking-wide text-on-surface-variant">
          Choose a layout
        </p>
        <div className="grid grid-cols-1 gap-2">
          {templates.map((tpl) => {
            const isActive = selected === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onSelect(tpl.id)}
                className={`flex items-center gap-3 rounded-xl p-2 text-left transition ${
                  isActive
                    ? "bg-surface-container-lowest ring-2 ring-primary/30"
                    : "bg-surface-container-high hover:bg-surface-container-lowest"
                }`}
              >
                <div className="relative h-[66px] w-[50px] shrink-0 overflow-hidden rounded-md bg-surface-container">
                  <Image
                    src={tpl.preview}
                    alt={tpl.name}
                    fill
                    className="object-contain p-1"
                    sizes="50px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-on-surface">{tpl.name}</p>
                  <p className="line-clamp-2 text-xs text-on-surface-variant">{tpl.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </details>
  );
}
