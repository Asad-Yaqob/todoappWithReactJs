import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Bounce, Flip, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";

function App() {
  const [todo, setTodo] = useState([]);

  const addTodo = (todo) => {
    setTodo((prevState) => [...prevState, todo]);
     toast.dismiss();
    toast.success("Todo added successfully!");
  };

  const removeTodo = (todo) => {
    setTodo((prevState) => prevState.filter((t) => t.id !== todo.id));
     toast.dismiss();
    toast.error("Todo removed successfully!");
  };

  const updateTodo = (id, updatedTodo) => {
    setTodo((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, ...updatedTodo } : t))
    );
    toast.dismiss();
    toast.success("Todo Updated successfully!");
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<TodoList todos={todo} removeTodo={removeTodo} />}
          />
          <Route path="/add-todo" element={<AddTodo todos = {todo} addTodo={addTodo} />} />
          <Route
            path="/edit-todo/:id"
            element={<EditTodo todos={todo} editTodo={updateTodo} />}
          />
        </Routes>
      </Router>
      <ToastContainer
      position="top-right"
      transition={Slide} />
    </>
  );
}

export default App;
