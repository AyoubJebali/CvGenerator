import React from 'react'

export default function ObjectivesSection() {
  return (
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
    <input type="checkbox" />
    <div className="collapse-title text-xl font-medium text-black">
      Objectives
    </div>
    <div className="collapse-content bg-gray-100 rounded-lg shadow-lg text-black">
    <div className="form-control mb-4">
        <label htmlFor="objectives" className="label">
          <span className="label-text">Objectives:</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full bg-white"
          placeholder="Objectives"
          name="objectives"
        ></textarea>
      </div>
    </div>
  </div>
  )
}
