import { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);


   const getTodos = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/getTodo`)
    setTodos(response.data)
    console.log(response.data)
    
   }

useEffect(() => {
getTodos()
},[])

  const handleAddTodo = async () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      // edit mode
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = input;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // add mode
      if(!input.trim()) return ;
      try{
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/addTodo`, {title : input})
        setInput('')
        getTodos()
      }catch(error){
        console.log("Add Todo failed",error.message);
        
      }
     
    }

    setInput("");
  };





  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo"
        style={{ padding: "8px", width: "70%" }}
        className="border border-gray-300 rounded-xl outline-none"
      />
      <button onClick={handleAddTodo} style={{ padding: "8px", marginLeft: "10px" }}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleDeleteAll} style={{ padding: "8px", background: "red", color: "white" }}>
          Delete All
        </button>
      </div>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: "0" }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{//
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{todo.title}</span>
            <div>
              <button onClick={() => handleEditTodo(index)} style={{ marginRight: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDeleteTodo(index)} style={{ background: "red", color: "white" }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
