import todoList from "../assets/data/db.json"
import type { List } from "../@types/types";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

import {useState} from "react";

const TaskList = () => {
    const [data, setData] = useState<List[]>(todoList.todo);

    
    console.log(data)
    return(
        <>
            <div className="h-76 bg-white rounded-4xl p-5 relative">
                <div className="flex items-center justify-between">
                    <h1>Task List (6 task)</h1>
                    <div>
                    <CiSearch />
                    </div>
                </div>

                {
                    data && data.length > 0 ?
                        data.map((todo)=>(
                            <div key={todo.id}>
                                <h1>{todo.title}</h1>
                            </div>
                        ))
                    : null
                }

                <div className="absolute bottom-0 left-0 border w-full p-2 rounded-b-4xl flex justify-center">
                    <button className="flex items-center gap-2"><IoIosAddCircleOutline />
                    Add</button>
                </div>
            </div>
        </>
    )
}

export default TaskList;