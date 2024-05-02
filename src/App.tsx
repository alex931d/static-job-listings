import { useEffect, useState } from "react";
import "./App.css";
import { IJob } from "./contexts/types";
import { useGameContext } from "./models/Context";
import Header from "./compunets/Header/Header";
import Body from "./compunets/Body/Body";

function App() {
  const { state, activeTags, setActiveTags, toggleActive, filteredState } =
    useGameContext();

  const [filterState, setFilterState] = useState(filteredState);
  useEffect(() => {
    setFilterState(filteredState);
  }, [filteredState]);

  const removeTag = (tagToRemove: string) => {
    setActiveTags((prevTags: string[]) =>
      prevTags.filter((tag: string) => tag !== tagToRemove)
    );
  };
  const clearTags = () => {
    setActiveTags([]);
  };
  return (
    <>
      <Header
        activeTags={activeTags}
        removeTag={removeTag}
        clearTags={clearTags}
      />
      <Body
        state={filterState}
        activeTags={activeTags}
        toggleActive={toggleActive}
      />
    </>
  );
}

export default App;
