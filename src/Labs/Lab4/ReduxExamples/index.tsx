import React from "react";
import TodoList from "./todos/Todolist";
import AddRedux from "./AddRedux";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import TodoForm from "./todos/TodoForm";
import TodoItem from "./todos/TodoItem";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
      <CounterRedux/>
      <HelloRedux />
      <AddRedux /> 
      <TodoList />
      <hr />
    </div>
  );
};
