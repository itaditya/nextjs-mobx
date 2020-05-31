import React from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { useStoreRoot } from '../storeRoot';

const Notes = observer(function Todos() {
  const { storeTodos, storeNotes } = useStoreRoot();
  return (
    <div className="todos">
      <Link href="/">
        <a className="text-blue-700">Home</a>
      </Link>
      <Link href="/todos">
        <a className="text-blue-700">Todos</a>
      </Link>
      <h2>Notes</h2>
      <ul className="notes-list">
        {storeNotes.notes.map(note => (
          <li
            key={note.id}
            className={`note ${note.completed && 'line-through'}`}
            onClick={() => (note.completed = !note.completed)}
          >
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
});

export async function getStaticProps() {
  const notes = await fetch(
    'https://api.jsonbin.io/b/5ed2a95379382f568bcff672/latest'
  ).then(res => res.json());
  return {
    props: {
      initialData: {
        notes,
      },
    },
  };
}

export default Notes;
