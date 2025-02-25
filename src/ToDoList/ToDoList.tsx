import { fetchToDoList } from "./ToDoThunks.ts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store.ts";
import ToDo from "../components/ToDo.tsx";
import Loader from "../UI/Loader.tsx";

const ToDoList = () => {
  const toDoListValue = useSelector((state: RootState) => state.toDoList.tasks);
  const toDoListLoading = useSelector(
    (state: RootState) => state.toDoList.loading,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToDoList());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      {toDoListLoading ? (
        <Loader />
      ) : (
        toDoListValue.map((toDo) => <ToDo toDo={toDo} key={toDo.id} />)
      )}
    </div>
  );
};

export default ToDoList;
