import  {useState, useEffect, useRef} from 'react'
import {motion} from 'motion/react'
import { MdOutlineTimer } from "react-icons/md";
import { FiCoffee } from "react-icons/fi";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { RiResetLeftLine } from "react-icons/ri";
import { usePomodoro } from '../assets/hook/pomodoroStore';


const Pomodoro = () =>{
    const { incrementCycle } = usePomodoro()
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [time, setTime] = useState<number>(25 * 60)
    const [mode, setMode] = useState<string>('focus') // or break
    const hasHandledTimerEnd = useRef<boolean>(false)
    // const [cycle, setCycle] = useState<number>(0)

    useEffect(()=>{
        let timer : number
        if(isRunning){
            hasHandledTimerEnd.current = false
            timer = setInterval(()=>{
                setTime((prev)=>{
                    if(prev <= 1){
                        return 0;
                    }
                    return prev - 1
                })
            }, 1000)
        }   
        return ()=> clearInterval(timer)
    }, [isRunning])

    useEffect(() => {
        if(time === 0 && isRunning && !hasHandledTimerEnd.current){
            hasHandledTimerEnd.current = true
            setIsRunning(false)
            if(mode === 'focus'){
                setMode('break')
                setTime(5 * 60)
            }else{
                setMode('focus')
                setTime(25 * 60)
                incrementCycle()
            }
        }
    }, [time, isRunning, mode, incrementCycle])

    const formatTime = () => {
        const mins = Math.floor(time / 60).toString().padStart(2, "0")
        const sec = (time % 60).toString().padStart(2, "0")
        return `${mins} : ${sec}`
    }

    const handleReset = () => {
        setIsRunning(false)
        hasHandledTimerEnd.current = false
        setTime(mode === 'focus' ? 25 * 60 : 5 * 60)
       
    }
    return (
        <>
        <div className='p-2 py-5 rounded-4xl bg-neutral-500 flex flex-col gap-5 items-center w-full mobile:min-w-[340px] laptop:min-w-[400px]'>
                <div className=' relative p-3 w-full bg-neutral-500 flex justify-around  shadow-lg rounded-full'>

                     <motion.div className={`absolute bg-white p-7 w-45 inset-shadow-sm inset-shadow-gray-300 top-0  transition-all duration-200 rounded-full ${mode === "focus" ? "-translate-x-18 laptop:-translate-x-25" : "translate-x-18 laptop:translate-x-25"}`}   />
              
                    
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
                    
                </div>
        </div>
        </>
    )
}

export default Pomodoro