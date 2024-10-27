import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../../Components/Skeleton";
import ShowModal from "../../Components/ShowModal";

function AllToDos() {
  const [allToDos, setAllToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/todo/todos`)
      .then((response) => {
        const todosData = response.data.data; // Assuming response structure has 'data'
        setAllToDos(todosData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  // Complete a todo
  const handleComplete = (id) => {
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
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:mx-10 my-20">
        {allToDos.map((todo) => (
          <div
            key={todo._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl"
          >
            <div
              className="card-body"
              onClick={() => {
                setSelectedTodo(todo);
              }}
            >
              <h2 className="card-title">{todo.title}</h2>
              <p>{todo.description.slice(0, 100) + "..."}</p>
              <p>Status: {todo.status}</p>
              <div className="card-actions justify-end">
                {todo.status === "active" && (
                  <button
                    onClick={() => handleComplete(todo._id)}
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
