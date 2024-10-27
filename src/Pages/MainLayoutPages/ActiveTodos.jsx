import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../../Components/Skeleton";
import Tab from "../../Components/Tab";

function ActiveTodos() {
  const [allToDos, setAllToDos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/todo/active`)
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
  if (loading) return <Skeleton />;

  return (
    <div className="min-h-screen my-5 mx-5">
      <Tab />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-5 my-5 lg:my-20">
        {allToDos.map((todo) => (
          <div
            key={todo._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl"
          >
            <div className="card-body">
              <h2 className="card-title text-fuchsia-600 font-semibold">
                {todo.title}
              </h2>
              <p>{todo.description}</p>

              <div className="card-actions justify-end">
                <p className="text-sm font-bold text-green-700">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveTodos;
