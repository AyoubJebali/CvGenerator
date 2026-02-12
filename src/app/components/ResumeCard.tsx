import React, { useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";

interface ResumeCardProps {
  id: string;
  title: string;
  editedDaysAgo: number;
  imageSrc: string;
  onDelete: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  id,
  title,
  editedDaysAgo,
  imageSrc,
  onDelete,
  onEdit,
  onView,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting resume:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const formatEditedTime = (days: number) => {
    if (days === 0) return "Edited today";
    if (days === 1) return "Edited yesterday";
    if (days < 7) return `Edited ${days} days ago`;
    if (days < 30) return `Edited ${Math.floor(days / 7)} weeks ago`;
    return `Edited ${Math.floor(days / 30)} months ago`;
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow group">
        {/* Card Image */}
        <figure className="relative h-48 bg-base-200 overflow-hidden">
          <img
            src={imageSrc}
            alt={`${title} Preview`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              className="btn btn-circle btn-sm btn-primary"
              onClick={() => onView?.(id)}
              title="View"
            >
              <FiEye size={16} />
            </button>
            <button
              className="btn btn-circle btn-sm btn-secondary"
              onClick={() => onEdit?.(id)}
              title="Edit"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              className="btn btn-circle btn-sm btn-error"
              onClick={() => setShowConfirm(true)}
              title="Delete"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </figure>

        {/* Card Body */}
        <div className="card-body p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h2 className="card-title text-base truncate text-black">{title}</h2>
              <p className="text-sm text-base-content/60">
                {formatEditedTime(editedDaysAgo)}
              </p>
            </div>
            {/* Dropdown Menu */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle">
                <FiMoreVertical size={16} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-40"
              >
                <li>
                  <a onClick={() => onView?.(id)}>
                    <FiEye size={14} /> View
                  </a>
                </li>
                <li>
                  <a onClick={() => onEdit?.(id)}>
                    <FiEdit2 size={14} /> Edit
                  </a>
                </li>
                <li>
                  <a className="text-error" onClick={() => setShowConfirm(true)}>
                    <FiTrash2 size={14} /> Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="badge badge-outline badge-sm mt-2">A4</div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog className={`modal ${showConfirm ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Resume</h3>
          <p className="py-4">
            Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.
          </p>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowConfirm(false)}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ResumeCard;