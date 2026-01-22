import { useContext, createContext, useState, ReactNode } from "react";

interface PomodoroContextType{
    completedCycle : number
    incrementCycle : ()=>void
    resetCycle : ()=>void
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined)

export const usePomodoroContext = () => {
    const context = useContext(PomodoroContext);
    if(!context){
        throw new Error('usePomodoro context must be inside PomodoroProvider')
    }
    return context
}
interface PomodoroProviderProps {
    children : ReactNode
}
export const PomodoroProvider : React.FC<PomodoroProviderProps> = ({children}) => {
    const [completedCycle, setCompleteCycle] = useState<number>(0)

    const incrementCycle = () => {
        setCompleteCycle((prev)=> prev + 1)
    }
    const resetCycle = () =>{
        setCompleteCycle(0)
    }
    return (
        <PomodoroContext.Provider value={{completedCycle, incrementCycle, resetCycle}} >
            {children}
        </PomodoroContext.Provider>
    )
}