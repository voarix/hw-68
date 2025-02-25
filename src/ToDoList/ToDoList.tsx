import { fetchToDoList } from "./ToDoThunks.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store.ts";

const ToDoList = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToDoList());
  }, [dispatch]);

  return (
    <div>
      asasef
    </div>
  );
};

export default ToDoList;