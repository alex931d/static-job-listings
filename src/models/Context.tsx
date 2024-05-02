import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useQuery } from "react-query";
import { IJob, IProject } from "../contexts/types";

interface ContextState {
  state: IProject;
  updateState: (data: IProject[]) => void;
}

interface ContextActiveTags {
  activeTags: string[];
  setActiveTags: (tags: string[] | ((prevTags: string[]) => string[])) => void;
}

interface ContextValue extends ContextState, ContextActiveTags {
  toggleActive: (tag: string) => void;
  filteredState: IProject;
}

const GameContext = createContext<ContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const {
    data: state,
    isLoading,
    isError,
  } = useQuery<IProject>("gameData", async () => {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  });

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filteredState, setFilteredState] = useState<IProject>([]);

  const toggleActive = (tag: string) => {
    setActiveTags((prevTags) => {
      const updatedTags = [...prevTags];
      const tagIndex = updatedTags.indexOf(tag);
      if (tagIndex !== -1) {
        updatedTags.splice(tagIndex, 1);
      } else {
        updatedTags.push(tag);
      }
      return updatedTags;
    });
  };

  useEffect(() => {
    if (state) {
      const newFilteredState = state.filter((job: IJob) => {
        return activeTags.every(
          (tag) => job.languages.includes(tag) || job.tools.includes(tag)
        );
      });

      setFilteredState(
        newFilteredState.length === 0 ? state : newFilteredState
      );
    } else {
      setFilteredState([]);
    }
  }, [activeTags, state]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!state) return <div>error state don't exists</div>;
  return (
    <GameContext.Provider
      value={{
        state,
        updateState: useState,
        setActiveTags,
        activeTags,
        toggleActive,
        filteredState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
