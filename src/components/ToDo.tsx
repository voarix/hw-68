import React from "react";
import { Task } from "../types";

interface Props {
  toDo: Task;
}

const ToDo: React.FC<Props> = ({toDo}) => {
  return (
    <div className="mb-4 shadow p-3 d-flex justify-content-between align-items-center rounded border">
      <div className="card-body">
        <h2 className="card-title mt-2">{toDo.title}</h2>
        <button className="btn btn-danger mt-3">Delete</button>
      </div>
      <input className="form-check-input me-3" type="checkbox" />
    </div>
  );
};

export default ToDo;