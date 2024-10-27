/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const ShowModal = ({ data, setAllToDos, closeModal }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    // Close modal on 'Esc' key press
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    // Close modal on outside click
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/todo/${data._id}`)
      .then(() => {
        setAllToDos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== data._id)
        );
        closeModal();
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div
      className={`modal ${
        data ? "modal-open" : ""
      } modal-bottom sm:modal-middle`}
    >
      <div ref={modalRef} className="modal-box">
        <h3 className="font-bold text-lg">{data.title}</h3>
        <p className="py-4">{data.description}</p>
        <div className="modal-action">
          {confirmDelete ? (
            <>
              <p>Are you sure you want to delete this todo?</p>
              <button onClick={handleDelete} className="btn btn-error">
                Confirm Delete
              </button>
              <button onClick={() => setConfirmDelete(false)} className="btn">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setConfirmDelete(true)}
                className="btn btn-error"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
