import { useState, type ReactNode } from "react";
import { PomodoroContext } from "../hook/pomodoroStore";

interface PomodoroProviderProps {
  children: ReactNode;
}

export const PomodoroProvider: React.FC<PomodoroProviderProps> = ({
  children,
}) => {
  const [completedCycle, setCompleteCycle] = useState<number>(0);

  const incrementCycle = () => {
    setCompleteCycle((prev) => prev + 1);
  };

  const resetCycle = () => {
    setCompleteCycle(0);
  };

  return (
    <PomodoroContext.Provider
      value={{ completedCycle, incrementCycle, resetCycle }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
