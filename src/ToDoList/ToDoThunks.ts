import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Task, TaskApi, TaskChangeThunks } from "../types";
import { RootState } from "../app/store.ts";

export const fetchToDoList = createAsyncThunk<Task[], void>(
  "toDoList/fetchToDoList",
  async () => {
    const response = await axiosApi<TaskApi>("tasks.json");
    if (response.data) {
      const objPages = response.data;
      const objKeys = Object.keys(objPages);
      return objKeys.map((id) => ({
        id: id,
        ...objPages[id],
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
