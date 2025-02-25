import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Task } from "../types";

export const fetchToDoList = createAsyncThunk<Task[], void>(
  'toDoList/fetchToDoList',
  async () => {
    const response = await axiosApi('tasks.json');
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
  }
);