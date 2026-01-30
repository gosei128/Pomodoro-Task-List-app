import { useState } from 'react';
import type { List } from '../../@types/types.ts';
import todoList from '../data/db.json';

export const useTodos = () => {
  const [data, setData] = useState<List[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos).todo : todoList.todo;
  });

  const addTodo = (title: string) => {
    const newTodo = { id: data.length + 1, title };
    const updatedData = [...data, newTodo];
    setData(updatedData);
    localStorage.setItem('todos', JSON.stringify({ todo: updatedData }));
  };

  return { data, addTodo };
};
