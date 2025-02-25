import { createToDo, fetchToDoList } from "./ToDoThunks.ts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store.ts";
import ToDo from "../components/ToDo.tsx";
import Loader from "../UI/Loader.tsx";
import ToDoForm from "../components/ToDoForm.tsx";
import { TaskForm } from "../types";

const ToDoList = () => {
  const toDoListValue = useSelector((state: RootState) => state.toDoList.tasks);
  const toDoListLoading = useSelector(
    (state: RootState) => state.toDoList.loading,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToDoList());
  }, [dispatch]);

  const onAddToDo = (form: TaskForm) => {
    dispatch(createToDo(form));
  };

  return (
    <div className="container mt-4">
      <ToDoForm onSubmitAdd={onAddToDo} />
      {toDoListLoading ? (
        <Loader />
      ) : (
        toDoListValue.map((toDo) => <ToDo toDo={toDo} key={toDo.id} />)
      )}
    </div>
  );
};

export default ToDoList;
