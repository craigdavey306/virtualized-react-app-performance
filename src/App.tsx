import { useState } from 'react';
import './App.css';

function App() {
  const [count] = useState(50_000);
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeight = 30;
  const windowHeight = 500;
  const innerHeight = count * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
  const endIndex = Math.min(
    Math.floor((scrollTop + windowHeight) / itemHeight) + 3,
    count
  );

  const items = Array.from({ length: count }, (_, i) => {
    return {
      index: i + 1,
      name: `Movie ${i + 1}`,
    };
  });

  const displayMovieItems = () => {
    const displayedItems = items.slice(startIndex, endIndex);

    const movieList = displayedItems.map((item) => {
      return (
        <div
          key={item.index}
          style={{
            height: itemHeight,
            position: 'absolute',
            width: '100%',
            top: `${item.index * itemHeight}px`,
          }}
        >
          {item.name}
        </div>
      );
    });

    return movieList;
  };

  const onScroll = (event: React.UIEvent) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <>
      <h1>Movies</h1>
      <div
        className="outerbox"
        style={{
          overflowY: 'scroll',
          border: '1px solid red',
          height: windowHeight,
          width: 500,
          margin: '0 auto',
        }}
        onScroll={onScroll}
      >
        <div
          className="innerbox"
          style={{ height: innerHeight, position: 'relative' }}
        >
          {displayMovieItems()}
        </div>
      </div>
    </>
  );
}

export default App;
