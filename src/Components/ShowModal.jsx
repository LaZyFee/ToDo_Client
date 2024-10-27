/*eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const ShowModal = ({ data, setAllToDos, closeModal }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      <div className="modal-box">
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
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
