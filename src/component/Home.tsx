import Pomodoro from "./Pomodoro"

const Home = () => {


    return (
        <div className="">
            <div className="flex justify-center items-center h-screen">
                <div className="grid mobile:grid-cols-1 laptop:grid-cols-2 gap-5">
                    <div className="laptop:col-start-2 border h-20" >Pomodoro Timer</div>
                    <div className="laptop:col-start-1 laptop:row-start-1 laptop:row-span-2 border" >Div Task List</div>
                    <div className="mobile:row-start-2 laptop:col-start-2 border"><Pomodoro /></div>
                </div>
            </div>
        </div>
    )
}

export default Home