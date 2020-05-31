import React, { createContext, useContext } from 'react';
import { observable } from 'mobx';

export const contextStoreRoot = createContext(null);
const { Provider } = contextStoreRoot;

const storeCount = {
  count: 0,
  increment() {
    this.count += 1;
  },
};

const storeTheme = {
  theme: 'light',
};

let store = observable({
  storeCount,
  storeTheme,
  storeTodos: {
    todos: null,
  },
  storeNotes: {
    notes: null,
  },
});

function createStore(data = {}) {
  store.storeTodos.todos = store.storeTodos.todos || data.todos;
  store.storeNotes.notes = store.storeNotes.notes || data.notes;
}

export function ProviderRoot(props) {
  console.log('ProviderRoot');
  createStore(props.value);

  return <Provider {...props} value={store} />;
}

export function useStoreRoot() {
  const store = useContext(contextStoreRoot);

  if (!store) {
    throw new Error('Render this component inside ProviderRoot');
  }

  return store;
}
