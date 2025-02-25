import { TaskForm } from "../types";
import React, { useState } from "react";

interface ToDoForm {
  onSubmitAdd: (meal: TaskForm) => void;
}

const initialForm: TaskForm = {
  title: "",
  status: false,
};

const ToDoForm: React.FC<ToDoForm> = ({ onSubmitAdd }) => {
  const [form, setForm] = useState<TaskForm>(initialForm);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAdd(form);
    setForm(initialForm);
  };

  const onChangeInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-5">
      <div className="card h-100 border shadow-sm">
        <div className="card-body p-4">
          <h2 className="mb-4">Add new task</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Task description"
                required
                name="title"
                value={form.title}
                onChange={onChangeInputMessage}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ToDoForm;
