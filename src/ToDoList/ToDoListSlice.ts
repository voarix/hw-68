import { Task, TaskChangeThunks } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeToDoStatus, deleteToDo, fetchToDoList } from "./ToDoThunks.ts";

interface ToDoListSlice {
  tasks: Task[];
  loading: boolean;
  error: false;
}

const initialState: ToDoListSlice = {
  tasks: [],
  loading: false,
  error: false,
};

export const ToDoListSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToDoList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchToDoList.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        },
      )
      .addCase(fetchToDoList.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })

      .addCase(changeToDoStatus.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        changeToDoStatus.fulfilled,
        (state, action: PayloadAction<TaskChangeThunks>) => {
          state.loading = false;
          state.tasks = state.tasks.map((task) => {
            if (task.id === action.payload.id) {
              return { ...task, status: action.payload.status };
            } else {
              return task;
            }
          });
        },
      )
      .addCase(changeToDoStatus.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })

      .addCase(deleteToDo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteToDo.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteToDo.rejected, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});

export const toDoListReducer = ToDoListSlice.reducer;
