import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Task, TaskApi, TaskChangeThunks, TaskForm } from "../types";
import { RootState } from "../app/store.ts";

export const fetchToDoList = createAsyncThunk<Task[], void>(
  "toDoList/fetchToDoList",
  async () => {
    const response = await axiosApi<TaskApi>("tasks.json");
    if (response.data) {
      const objTasks = response.data;
      const objKeys = Object.keys(objTasks);
      return objKeys.map((id) => ({
        id: id,
        ...objTasks[id],
      }));
    } else {
      return [];
    }
  },
);

export const changeToDoStatus = createAsyncThunk<
  TaskChangeThunks,
  TaskChangeThunks,
  { state: RootState }
>("toDoList/changeToDoStatus", async ({ id, status }, thunkAPI) => {
  const task = thunkAPI
    .getState()
    .toDoList.tasks.find((task) => task.id === id);
  const newTask = { ...task, status };

  await axiosApi.put(`tasks/${id}.json`, newTask);
  return { id, status };
});

export const deleteToDo = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("toDoList/deleteToDo", async (id) => {
  await axiosApi.delete(`tasks/${id}.json`);
  return id;
});

export const createToDo = createAsyncThunk<Task, TaskForm>(
  "toDoList/createToDo",
  async (taskForm) => {
    const response = await axiosApi.post("tasks.json", taskForm);
    return {
      id: response.data.name,
      ...taskForm,
    };
  },
);
