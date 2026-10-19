import React from "react";
import { useCv } from "../CvContext";

export default function PersonalInfoSection() {
  const { data, setData } = useCv();

  return (
    <section className="editor-section p-5 md:p-7">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[34px] font-extrabold text-on-surface">Personal Information</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">FULL NAME</span>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="h-14 w-full rounded-xl border border-outline-variant bg-surface-container-high px-4 text-lg text-on-surface placeholder:text-on-surface-variant"
            placeholder="e.g. Jonathan Doe"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">PROFESSIONAL TITLE</span>
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="h-14 w-full rounded-xl border border-outline-variant bg-surface-container-high px-4 text-lg text-on-surface placeholder:text-on-surface-variant"
            placeholder="e.g. Senior Product Designer"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">EMAIL</span>
          <input
            type="email"
            id="email"
            name="email"
            value={data.contact.email}
            onChange={(e) =>
              setData({
                ...data,
                contact: { ...data.contact, email: e.target.value },
              })
            }
            className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 text-base text-on-surface"
            placeholder="you@email.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">PHONE</span>
          <input
            type="tel"
            id="number"
            name="number"
            value={data.contact.phone}
            onChange={(e) =>
              setData({
                ...data,
                contact: { ...data.contact, phone: e.target.value },
              })
            }
            className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 text-base text-on-surface"
            placeholder="+1 234 567 890"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">ADDRESS</span>
          <input
            type="text"
            id="address"
            name="address"
            value={data.contact.location}
            onChange={(e) =>
              setData({
                ...data,
                contact: { ...data.contact, location: e.target.value },
              })
            }
            className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 text-base text-on-surface"
            placeholder="City, Country"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">LINKEDIN</span>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={data.contact.linkedin}
            onChange={(e) =>
              setData({
                ...data,
                contact: { ...data.contact, linkedin: e.target.value },
              })
            }
            className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 text-base text-on-surface"
            placeholder="linkedin.com/in/username"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">GITHUB</span>
          <input
            type="url"
            id="github"
            name="github"
            value={data.contact.github || ""}
            onChange={(e) =>
              setData({
                ...data,
                contact: { ...data.contact, github: e.target.value },
              })
            }
            className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 text-base text-on-surface"
            placeholder="github.com/username"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-semibold tracking-[0.14em] text-on-surface-variant">PROFILE</span>
          <textarea
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface"
            placeholder="Tell us about yourself"
            name="profile"
            value={data.about}
            onChange={(e) => setData({ ...data, about: e.target.value })}
            id="profile"
            rows={4}
          ></textarea>
        </label>
      </div>
    </section>
  );
}
