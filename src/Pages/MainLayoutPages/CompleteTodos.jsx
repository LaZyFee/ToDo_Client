import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../../Components/Skeleton";

function CompleteTodos() {
  const [allToDos, setAllToDos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/todo/complete`)
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 lg:mt-0">
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
                {" "}
                <p className="text-sm font-bold text-green-700">
                  Status: {todo.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompleteTodos;
