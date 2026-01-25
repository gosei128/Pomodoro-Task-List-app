import Header from "./Header"
import Pomodoro from "./Pomodoro"
import { PomodoroProvider } from "../assets/context/PomodoroContext"
import TaskList from "./TaskList"

const Home = () => {
    return (
        <div className="">
            <div className="flex justify-center laptop:items-center">
                <div className="grid gap-2 mobile:grid-cols-1 laptop:grid-cols-2">
                    <PomodoroProvider>
                        <div className="laptop:col-start-2 h-20" ><Header/></div>
                        <div className="laptop:col-start-1 laptop:row-start-1 laptop:row-span-2" ><TaskList /></div>
                        <div className="mobile:row-start-2 laptop:col-start-2 "><Pomodoro /></div>
                    </PomodoroProvider>
                </div>
            </div>
        </div>
    )
}

export default Home