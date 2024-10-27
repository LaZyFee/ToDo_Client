import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../../Components/Skeleton";
import ShowModal from "../../Components/ShowModal";
import Tab from "../../Components/Tab";

function AllToDos() {
  const [allToDos, setAllToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/todo/todos`)
      .then((response) => {
        const todosData = response.data.data;
        setAllToDos(todosData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  // Complete a todo
  const handleComplete = (event, id) => {
    event.stopPropagation();
    axios
      .patch(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}/complete`)
      .then((response) => {
        console.log("Todo marked as complete:", response.data); // Debug log
        setAllToDos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, status: "complete" } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error completing todo:", error);
      });
  };

  // Close modal and reset selectedTodo
  const closeModal = () => {
    setSelectedTodo(null);
  };

  if (loading) return <Skeleton />;

  return (
    <div className="min-h-screen my-5 mx-5">
      <Tab />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:mx-5 my-5 lg:my-20">
        {allToDos
          .sort((a, b) => {
            // Sort by status first, with "active" todos appearing before others
            if (a.status !== b.status) return a.status === "active" ? -1 : 1;

            // If both have the same status, sort by creation date (newest first)
            return new Date(b.date) - new Date(a.date);
          })
          .map((todo) => (
            <div
              key={todo._id}
              className="card bg-base-500 shadow-xl hover:shadow-2xl"
              onClick={() => {
                setSelectedTodo(todo);
              }}
            >
              <div className="card-body">
                <h2 className="card-title font-semibold text-lime-500 whitespace-nowrap">
                  {todo.title}
                </h2>
                <p>{todo.description.slice(0, 100) + "..."}</p>
                <p className="font-semibold text-green-600">
                  Status: {todo.status}
                </p>
                <p className="font-semibold text-fuchsia-600">
                  Created:{" "}
                  {new Date(todo.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
                {todo.completedAt && (
                  <p className="font-semibold text-green-600">
                    Completed:{" "}
                    {new Date(todo.completedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </p>
                )}

                <div className="card-actions justify-end">
                  {todo.status === "active" && (
                    <button
                      onClick={(event) => handleComplete(event, todo._id)}
                      className="btn btn-primary"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {selectedTodo && (
        <ShowModal
          data={selectedTodo}
          setAllToDos={setAllToDos}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default AllToDos;
