import React from "react";
import { Task } from "../types";
import { AppDispatch } from "../app/store.ts";
import { useDispatch } from "react-redux";
import { changeToDoStatus, deleteToDo } from "../ToDoList/ToDoThunks.ts";

interface Props {
  toDo: Task;
}

const ToDo: React.FC<Props> = ({ toDo }) => {
  const dispatch: AppDispatch = useDispatch();

  const onInputChangeCheck = () => {
    dispatch(changeToDoStatus({ id: toDo.id, status: !toDo.status }));
  };

  const onDelete = () => {
    dispatch(deleteToDo(toDo.id));
  };

  return (
    <div className="mb-4 shadow p-3 d-flex justify-content-between align-items-center rounded border">
      <div className="card-body">
        <h2 className="card-title mt-2">{toDo.title}</h2>
        <button
          className="btn btn-danger mt-3"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <input
        className="form-check-input me-3"
        type="checkbox"
        checked={toDo.status}
        onChange={onInputChangeCheck}
      />
    </div>
  );
};

export default ToDo;
