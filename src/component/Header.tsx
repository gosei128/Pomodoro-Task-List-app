import { usePomodoro } from "../assets/hook/pomodoroStore"

const Header = () => {
    const {completedCycle} = usePomodoro()
    return (
        <>
            <div className="w-full h-full bg-white border border-neutral-200  rounded-xl flex justify-center items-center">
                { 
                completedCycle === 0 ? <h1 className="text-2xl font-semibold text-neutral-600 self-center"> Still to progress yet.</h1> :
                   [...Array(completedCycle)].map((_)=>{

                     return (
                        <span className="text-6xl">🍎</span>
                     )
                   })
                }
            </div>
        </>
    )
}

export default Header