import React from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { useStoreRoot } from '../storeRoot';

function sortTodos(todos) {
  return todos.sort((a, b) => a.completed && !b.completed);
}

const Todos = observer(function Todos() {
  const { storeTodos, storeNotes } = useStoreRoot();
  const todos = sortTodos(storeTodos.todos.slice());
  return (
    <div className="todos">
      <Link href="/">
        <a className="text-blue-700">Home</a>
      </Link>
      <Link href="/notes">
        <a className="text-blue-700">Notes</a>
      </Link>
      <h2 className="text-2xl font-bold">Todos</h2>
      <ul className="flex flex-col space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className={`flex items-center`}>
            <p className={`todo-title ${todo.completed && 'line-through'}`}>
              {todo.title}
            </p>
            <button
              className="bg-blue-600 px-2"
              onClick={() => (todo.completed = !todo.completed)}
            >
              {todo.completed ? 'Incomplete' : 'Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export async function getStaticProps() {
  const todos = await fetch(
    'https://api.jsonbin.io/b/5ed37d327741ef56a5653494/latest'
  ).then(res => res.json());
  return {
    props: {
      initialData: {
        todos,
      },
    },
  };
}

export default Todos;
