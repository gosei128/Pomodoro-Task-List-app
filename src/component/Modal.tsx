import {useState} from "react";
import type {List} from "../@types/types.ts";
import todoList from "../assets/data/db.json";

interface ModalProp {
    onTaskAdded : () => void;
    isOpen: boolean
}
 const Modal = ({onTaskAdded , isOpen}: ModalProp ) => {
    const [data, setData] = useState<List[]>(() => {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos).todo : todoList.todo
    })
     const [isModalOpen, setModalOpen] = useState<boolean>(isOpen)
    const [task, setTask] = useState<string>("")
    const handleAddTodo = (e: React.FormEvent) =>{
        e.preventDefault()
        const newTodo = {id: data.length + 1, title: task}
        const updatedData = [...data, newTodo]
        setData(updatedData)
        
        // Save to localStorage
        localStorage.setItem('todos', JSON.stringify({todo: updatedData}))
        
        // Call the callback to refresh TaskList
        onTaskAdded()
        setModalOpen(false)
        
        // Clear the input
        setTask("")
    }
    // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     setTask(e.target.value)
    // }

    return (
        <>
            <form className={`${isModalOpen ? "block" : "hidden"} bg-white border border-neutral-300 shadow-lg items-center flex flex-col w-72 h-fit p-8 rounded-2xl absolute left-10 z-10`} onSubmit={handleAddTodo}>
                <input placeholder="Add Task" required className="border max-w-52 border-neutral-300 p-2 rounded-lg" type="text" value={task} onChange={(e)=> {
                    setTask(e.target.value)
                } } />
                <button type="submit" className=" rounded-lg p-1 mt-4  px-5 bg-neutral-500 text-white">Add</button>
            </form>
        </>
    );
};

 export default Modal