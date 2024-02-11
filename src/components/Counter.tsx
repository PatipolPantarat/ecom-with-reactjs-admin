// src/components/Counter.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../redux/slice";
import { RootState } from "../redux/rootReducer";
import Button from "./button";

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </div>
  );
};

export default Counter;
