import React from "react";
import { Link } from "react-router-dom";

import TodoItem from "../components/TodoItem.jsx";
import NoITem from "../components/NoITem.jsx";

const TodoList = ({ todos, removeTodo }) => {
  let content = <NoITem />;

  if (todos.length > 0) {
    content = todos.map((todo) => (
      <TodoItem data={todo} onPressedRemove={removeTodo} />
    ));
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 w-full">
        <h1 className="text-gray-600 text-3xl font-bold mb-4">TODO LIST</h1>

        <div className="w-full md:w-[700px]">
          <div className="flex justify-between items-center">
            <Link to="/add-todo">
              <button className="bg-gray-300 py-2 px-3 rounded m-2 w-full">
                add task
              </button>
            </Link>
          </div>

          <div className="bg-gray-200 flex flex-col rounded items-center justify-center p-4 w-full">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
