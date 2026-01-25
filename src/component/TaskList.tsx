import todoList from "../assets/data/db.json"
import type { List } from "../@types/types";
import { CiSearch } from "react-icons/ci";

const TaskList = () => {
    const data: List[] = todoList.todo

    
    console.log(data)
    return(
        <>
            <div className="h-76 bg-white rounded-4xl p-5">
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
            </div>
        </>
    )
}

export default TaskList;