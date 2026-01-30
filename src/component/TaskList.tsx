import todoList from "../assets/data/db.json"
import type { List } from "../@types/types";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {useState} from "react";
import Modal from "./Modal";
const TaskList = () => {
    const [data, setData] = useState<List[]>(() => {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos).todo : todoList.todo
    });
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleModalOpen = () => {
        setModalOpen(!isModalOpen)
    }
    const handleDeleteTask = (id: number) => {
        const updatedData = data.filter(todo => todo.id !== id)
        setData(updatedData)
        localStorage.setItem('todos', JSON.stringify({ todo: updatedData }))
    }
    console.log(data)
    return(
        <>
            {isModalOpen && <Modal isOpen={isModalOpen} onTaskAdded={() => {
                const savedTodos = localStorage.getItem('todos')
                if (savedTodos) {
                    setData(JSON.parse(savedTodos).todo)
                }
            }}/>}
            <div className="h-76 overflow-y-scroll bg-white rounded-4xl p-5 relative">
                <div className="flex border-b items-center justify-between">
                    <h1>Task List (6 task)</h1>
                    <div>
                    <CiSearch />
                    </div>
                </div>

                {
                    data && data.length > 0 ?
                        data.map((todo)=>(
                            <div key={todo.id} className="flex  items-center justify-between p-2 border-b">
                                <h1 className="flex-1">{todo.title}</h1>
                                <button
                                    onClick={() => handleDeleteTask(todo.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        ))
                    : null
                }

                <div className="absolute bottom-0 left-0 border bg-white border-neutral-500 w-full p-2 rounded-b-4xl flex justify-center">
                    <button className="flex items-center gap-2" onClick={handleModalOpen}><IoIosAddCircleOutline />
                    Add</button>
                </div>
            </div>
        </>
    )
}

export default TaskList;