import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { useStoreRoot } from '../storeRoot';

const Home = () => {
  const { storeTheme } = useStoreRoot();

  return (
    <div className="">
      <Head>
        <title>Homepage | Aditya Agarwal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`App theme-${storeTheme.theme}`}>
        <Link href="/todos">
          <a className="text-blue-700">Todos</a>
        </Link>
        <br />
        <Link href="/notes">
          <a className="text-blue-700">Notes</a>
        </Link>
        <VideoPlayer />
        <ThemeSwitcher />
      </main>

      <footer />
    </div>
  );
};

const VideoPlayer = React.memo(function VideoPlayer() {
  console.log('VideoPlayer');
  return (
    <div className="video-player">
      <LikeCounter />
    </div>
  );
});

const LikeCounter = function LikeCounter() {
  console.log('LikeCounter');
  const expensiveValue = Math.pow(10, 10);
  return (
    <div className="like-counter">
      <Counter />
      <br />
      {expensiveValue}
    </div>
  );
};

const Counter = observer(function Counter(props) {
  console.log('Counter');
  const { storeCount } = useStoreRoot();

  useEffect(() => {
    const title = `(${storeCount.count}) Left`;
    console.log(title);
    document.title = title;
  }, [storeCount.count]);

  return (
    <div className="counter">
      <p>Count: {storeCount.count}</p>
      <button onClick={() => storeCount.increment()}>Increment</button>
      <button onClick={() => (storeCount.count -= 1)}>Decrement</button>
    </div>
  );
});

const Notes = observer(function Notes(props) {
  console.log('Notes');
  const { storeNotes } = useStoreRoot();

  return (
    <div className="notes">
      <h2>Notes</h2>
      <ul className="notes-list">
        {storeNotes.notes.map(note => (
          <li key={note.id} className={`note ${note.completed && 'note-done'}`}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
});

const ThemeSwitcher = observer(function ThemeSwitcher() {
  console.log('ThemeSwitcher');
  const { storeTheme } = useStoreRoot();

  return (
    <div className="theme-switcher">
      <p>Theme: {storeTheme.theme}</p>
      <form>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={storeTheme.theme === 'light'}
            onChange={() => (storeTheme.theme = 'light')}
          />
          Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={storeTheme.theme === 'dark'}
            onChange={() => (storeTheme.theme = 'dark')}
          />
          Dark
        </label>
      </form>
    </div>
  );
});

export default Home;
