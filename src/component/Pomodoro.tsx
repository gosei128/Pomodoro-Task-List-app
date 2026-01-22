import  {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import { MdOutlineTimer } from "react-icons/md";
import { FiCoffee } from "react-icons/fi";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { RiResetLeftLine } from "react-icons/ri";
import { usePomodoroContext } from './PomodoroContext';


const Pomodoro = () =>{
    const {incrementCycle,completedCycle, resetCycle,} = usePomodoroContext()
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [time, setTime] = useState<number>(25 * 60)
    const [mode, setMode] = useState<string>('focus') // or break
    // const [cycle, setCycle] = useState<number>(0)

    useEffect(()=>{
        let timer : number
        if(isRunning){
            timer = setInterval(()=>{
                setTime((prev)=>{
                    if(prev === 1){
                        handleTimerEnd()
                        return 0;
                    }
                    return prev - 1
                })
            }, 1000)
        }
        return ()=> clearInterval(timer)
    }, [isRunning])

    const handleTimerEnd = () => {
        setIsRunning(false)
        if(mode === 'focus'){
            setMode('break')
            setTime(5 * 60)
        }else{
            setMode('focus')
            setTime(25 * 60)
            // setCycle((c)=> c + 1)
            incrementCycle()
        }
    }

    const formatTime = () => {
        const mins = Math.floor(time / 60).toString().padStart(2, "0")
        const sec = (time % 60).toString().padStart(2, "0")
        return `${mins} : ${sec}`
    }

    const handleReset = () => {
        setIsRunning(false)
        setTime(mode === 'focus' ? 25 * 60 : 5 * 60)
    }
    return (
        <>
        <div className='p-2 py-5 rounded-4xl bg-neutral-500 flex flex-col gap-5 items-center w-full mobile:min-w-[340px] laptop:min-w-[400px]'>
                <div className=' relative p-3 w-full bg-neutral-500 flex justify-around  shadow-lg rounded-full'>
                    <AnimatePresence >
                     <motion.div className='absolute bg-white p-7 w-45 inset-shadow-sm inset-shadow-gray-300 top-0 left-0 rounded-full' initial={{translateX:1,}} animate={{translateX : mode === 'focus' ? -1  : 140}}  />
                    </AnimatePresence>
                    
                    <h2 className={`z-10 text-2xl flex items-center gap-1 font-semibold ${mode === "focus" ? "text-neutral-600" : "text-white"}`}> <MdOutlineTimer />
                     Focus</h2>
                    <h2 className={`z-10 text-2xl flex items-center gap-1 font-semibold ${mode === "break" ? "text-neutral-600" : "text-white"}`}> <FiCoffee />
                    Break</h2>
                </div>
                <div>
                    <div className='text-5xl text-neutral-600 shadow-lg font-bold bg-white text-center p-5 rounded-2xl'>{formatTime()}</div>
                    <div className=' mt-5 flex gap-5 justify-center'>
                    <button className='boreder bg-white rounded-xl p-3 px-10' onClick={()=>setIsRunning(!isRunning)}>{isRunning ? <IoMdPause /> : <FaPlay />}</button>
                    <button className='boreder bg-white rounded-xl p-3 px-10 ' onClick={handleReset}><RiResetLeftLine className=''/></button>
                    </div>
                    <p>Pomodoros : {completedCycle}</p>
                </div>
        </div>
        </>
    )
}

export default Pomodoro