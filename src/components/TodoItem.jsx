import React from 'react'

import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const dataItem = ({ data, onPressedRemove }) => {
  return (
    <div
      key={data.id}
      className="ps-4 pe-4 pt-2 pb-2 bg-white m-2 flex justify-between w-[700px] rounded"
    >
      <div>
        <p>{data.todo}</p>
        <div>{data.deadline}</div>
      </div>
      <div className="flex items-center gap-2">
        <Link to={`/edit-todo/${data.id}`}>
          <button className="bg-gray-200 p-1 rounded">
            <MdCreate />
          </button>
        </Link>
        <button
          onClick={() => {
            onPressedRemove(data);
          }}
          className="bg-gray-200 p-1 rounded"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default dataItem
