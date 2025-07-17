import { useState, useMemo, useCallback, memo } from "react";

const delayedDouble = (num) => {
  for (let i = 0; i < 1999999999; i++);
  return num * 2;
};

export default function AppMemo() {
  const [count, setCount] = useState(0);
  const [firstHook, setFifstHook] = useState("useCallback");
  const [secondHook, setSecondHook] = useState("useMemo");
  const [dark, setDark] = useState(false);

  const themeStyle = {
    backgroundColor: dark ? "#0e0e0f" : "#282c34",
  };

  const setDarkTheme = () => {
    setDark((prev) => !prev);
  };

  const incrementCount = () => {
    setCount((count) => count + 1);
  };

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const hooks = useMemo(
    () => ({
      firstHook,
      secondHook,
    }),
    [firstHook, secondHook]
  );

  const doubleCount = useMemo(() => delayedDouble(count), [count]);

  return (
    <div style={{ ...themeStyle }}>
      <Title hooks={hooks} resetCount={resetCount} />
      <CountInfo count={doubleCount} />
      <button onClick={incrementCount}>+1</button>
      <button onClick={setDarkTheme}>Dark</button>
    </div>
  );
}

const Title = memo(({ hooks, resetCount }) => {
  const { firstHook, secondHook } = hooks;
  console.log("Title component rendered!");
  return (
    <>
      <h1>
        React.memo vs. {firstHook} vs. {secondHook}
      </h1>
      <button onClick={resetCount}>Reset</button>
    </>
  );
});

const CountInfo = ({ count }) => {
  return <h2>Count Value {count}</h2>;
};

//YouTube https://www.youtube.com/watch?v=OM-UNgMvvDk&t=339s
