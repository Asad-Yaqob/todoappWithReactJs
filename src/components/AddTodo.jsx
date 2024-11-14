import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import TodoModel from "../models/todo.model";

const AddTodo = ({ todos, addTodo }) => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [error, setError] = useState("");

  const todoRef = useRef();
  const deadLineRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    const formattedToday = today.toISOString().split("T")[0];
    const formattedNextYear = nextYear.toISOString().split("T")[0];

    setMinDate(formattedToday);
    setMaxDate(formattedNextYear);
  }, []);

  const handleSave = () => {
    const enterdTodo = todoRef.current.value;
    const enterdDealine = deadLineRef.current.value;

    if (enterdTodo.trim() === "" || enterdDealine === "") {
      setError("Please enter both Todo and Deadline.");
      return;
    }

    const isUnique = todos.find(
      (t) =>
        t.todo === todoRef.current.value ||
        t.deadline === deadLineRef.current.value
    );

    if (isUnique) {
      setError("Todo already exists.");
      return;
    }

    const todo = new TodoModel({
      todo: enterdTodo,
      deadline: enterdDealine,
    });

    addTodo(todo);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1 className="text-gray-600 text-3xl font-bold mb-4">ADD TODO</h1>

      <div className=" flex flex-col w-full md:w-[700px] rounded p-4 bg-gray-200">
        {error != null ? (
          <div className="flex justify-start items-center w-full mb-2">
            <span className="text-red-500">{error}</span>
          </div>
        ) : (
          <span />
        )}
        <div>
          <input
            ref={todoRef}
            type="text"
            placeholder="Enter your todo..."
            className="border-2 rounded border-gray-200 focus:border-gray-400 focus:outline-none py-2 px-4 w-full"
          />
          <div className="mt-4">
            <span className="mr-2">Select Deadline:</span>
            <input
              ref={deadLineRef}
              type="date"
              min={minDate}
              max={maxDate}
              className="border rounded px-2 py-1 focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex justify-center sm:justify-end items-center gap-3 mt-4 ">
            <Link to="/">
              <button className="font-bold mr-4 w-full">Go back</button>
            </Link>
            <button
              className="bg-gray-300 py-2 px-3 rounded  font-bold"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
