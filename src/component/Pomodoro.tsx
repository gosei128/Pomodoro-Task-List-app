import  {useState, useEffect} from 'react'
import {motion} from 'motion/react'
const Pomodoro = () =>{
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [time, setTime] = useState<number>(25 * 60)
    const [mode, setMode] = useState<string>('break') // or break
    const [cycle, setCycle] = useState<number>(0)

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
            setTime(5*60)
        }else{
            setMode('focus')
            setTime(25 * 60)
            setCycle((c)=> c + 1)
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
        <div className='p-2 h-[500px] flex flex-col items-center w-2xl'>
                <div className='w-lg relative flex justify-around border p-5 rounded-full bg-neutral-400'>
                    <motion.div className='absolute bg-white top-0 left-1 rounded-full w-50 p-8' initial={{translateX:0,}} animate={{translateX : mode === 'focus' ? 160  : 0}} />
                    <h2 className='z-10 font-[englebert]'>Focus</h2>
                    <h2 className='z-10'>Break</h2>
                </div>
                <div>
                    <div>{formatTime()}</div>
                    <button onClick={()=>setIsRunning(!isRunning)}>{isRunning ? "Pause" : "Start"}</button>
                    <button onClick={handleReset}>Reset</button>
                    <p>Pomodoros : {cycle}</p>
                </div>
        </div>
        </>
    )
}

export default Pomodoro