import React, { useEffect, useState, } from "react";

import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";


const EditTodo = ({ todos , editTodo }) => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [todoData, setTodoData] = useState({todo: "", deadline: ""});
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    const formattedToday = today.toISOString().split("T")[0];
    const formattedNextYear = nextYear.toISOString().split("T")[0];

    const todoToEdit = todos.find((t) => t.id === id);

    if (todoToEdit) {
        setTodoData({todo: todoToEdit.todo, deadline: todoToEdit.deadline});
    }

    setMinDate(formattedToday);
    setMaxDate(formattedNextYear);

  }, [id, todos]);

  const handleSave = () => {
    const enterdTodo = todoData.todo;
    const enterdDealine = todoData.deadline;

    if (enterdTodo.trim() === "" || enterdDealine === "") {
      setError("Please enter both Todo and Deadline.");
      return;
    }

    editTodo(id, todoData);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1 className="text-gray-600 text-3xl font-bold mb-4">EDIT TODO</h1>

      <div className="bg-gray-200 flex flex-col rounded items-center justify-center w-full md:w-[700px] p-4 ">
        {error != null ? (
          <div className="flex justify-start items-center w-full mb-2">
            <span className="text-red-500">{error}</span>{" "}
          </div>
        ) : (
          <span />
        )}
        
          <input
            type="text"
            placeholder="Enter your todo..."
            value={todoData.todo}
            onChange={(e) => setTodoData({ ...todoData, todo: e.target.value })}
            className="border-2 rounded border-gray-200 focus:border-gray-400 focus:outline-none py-2 px-4 w-full"
          />

          <div className="flex justify-start items-center w-full mt-4">
            <span className="mr-2">Select Deadline:</span>
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={todoData.deadline}
              onChange={(e) =>
                setTodoData({ ...todoData, deadline: e.target.value })
              }
              className="border rounded px-2 py-1 focus:border-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-center sm:justify-end  items-center w-full mt-4 ">
            <Link to="/">
              <button className="font-bold mr-4">Go back</button>
            </Link>
            <button
              onClick={handleSave}
              className="bg-gray-300 py-2 px-3 rounded w-28 font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
  );
};

export default EditTodo;
