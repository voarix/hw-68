import { Task } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchToDoList } from "./ToDoThunks.ts";

interface ToDoListSlice {
  tasks: Task[];
  loading: boolean;
  error: false
}

const initialState: ToDoListSlice = {
  tasks: [],
  loading: false,
  error: false,
};

export const ToDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToDoList.pending, (state) => {
        state.loading = true;
        state.error = false;
      }).addCase(fetchToDoList.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      }).addCase(fetchToDoList.rejected, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});

export const toDoListReducer = ToDoListSlice.reducer;