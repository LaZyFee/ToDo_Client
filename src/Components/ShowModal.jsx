/* eslint-disable */
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ShowModal = ({ data, setAllToDos, closeModal }) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const modalRef = useRef();
  const confirmModalRef = useRef();

  useEffect(() => {
    // Close modal on 'Esc' key press
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Close modal on outside click
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        (!confirmModalRef.current ||
          !confirmModalRef.current.contains(event.target))
      ) {
        closeModal();
        setIsDeleteConfirmationOpen(false);
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
        closeModal(); // Close the main modal
        setIsDeleteConfirmationOpen(false); // Close the confirmation modal
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <>
      {/* Main Modal */}
      <div
        className={`modal ${
          data ? "modal-open" : ""
        } modal-bottom sm:modal-middle`}
      >
        <div ref={modalRef} className="modal-box">
          <h3 className="font-bold text-lg">{data.title}</h3>
          <p className="py-4">{data.description}</p>

          <div className="flex justify-between mt-4">
            <div className="btn btn-info">Update</div>

            <div className="modal-action">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteConfirmationOpen(true);
                }}
                className="btn bg-red-500 text-white"
              >
                <FaTrashAlt className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="modal modal-open" ref={confirmModalRef}>
          <div className="modal-box bg-neutral text-neutral-content w-96">
            <div className="modal-body items-center text-center">
              <h2 className="font-bold text-xl">Confirm Delete</h2>
              <p>Are you sure you want to delete this todo?</p>
              <div className="modal-action flex justify-end gap-4 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent outside click handling
                    handleDelete();
                  }}
                  className="btn btn-primary"
                >
                  Accept
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteConfirmationOpen(false);
                  }}
                  className="btn btn-ghost"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowModal;
