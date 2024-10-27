import axios from "axios";
import { useEffect, useState } from "react";

function ActiveTodos() {
  const [allToDos, setAllToDos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/active`)
      .then((response) => {
        setAllToDos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-0">
        {allToDos.map((todo) => (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveTodos;
