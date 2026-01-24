import { createContext, useContext } from "react";

export interface PomodoroContextType {
  completedCycle: number;
  incrementCycle: () => void;
  resetCycle: () => void;
}

export const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined,
);

export const usePomodoro = (): PomodoroContextType => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
};

