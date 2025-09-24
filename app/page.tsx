"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import TaskContainer from "@/components/TaskContainer";
import PriorityDropdown from "@/components/PriorityDropdown";
import FilterDropdown from "@/components/FilterDropdown";
import { addTask } from "./hooks/useTasks";

export default function Home() {

    const [searchTask, setSearchTask] = useState("");
    const [mode, setMode] = useState("dark");
    const [icon, setIcon] = useState("moon");
    const [showAddTask, setShowAddTask] = useState(false);

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [filter, setFilter] = useState("All");

    const [tasks, setTasks] = useState<any[]>([]);
    const handleToggleMode = () => {
        if (mode == "dark") {
            setMode("light");
            setIcon("Sun");
        } else {
            setMode("dark");
            setIcon("moon");
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch("./api/tasks").then(res => res.json()).then(data => setTasks(data.tasks));
        };
        fetchTasks();
    }, []);

    const handleShowAdd = () => {
        setShowAddTask(!showAddTask);
    }

    const handleAdd = () => {
        const task = { title, priority, completed: false };
        addTask(task);
        setTasks(prev => [...prev, task]);
        setTitle("");
        setPriority("");
    }   
    const handleDelte = (taskID: string) => {
        setTasks((prev) => prev.filter((t) => t._id !== taskID));
    }
    let style;
    if(!priority || !title) style = "border cursor-not-allowed border-[#884cf7] text-[#884cf7]"
    else style = "cursor-pointer bg-[#884cf7]"

    return (
        <div className="h-[100vh] bg-[#14141E] flex justify-center items-center">
            <div className="flex flex-col items-center h-[90vh] w-[50vw] border border-gray-400 rounded-4xl bg-[#181822] absolute
            ">
                <div className="flex flex-col w-full px-8 items-center">
                    <h1 className="my-7 font-bold text-[1.2rem]">TODO LIST</h1>
                    <div className="flex w-full items-center gap-2.5 px-3 justify-between">
                        <div className="border-white border rounded-4xl flex grow p-[5px]">
                            <input type="text" className="grow ml-2.5 focus:border-none focus:outline-none" name="search" id="search" value={searchTask} onChange={(e) => { setSearchTask(e.target.value) }} />
                            <button className="hover:bg-[#313131] ease-in-out duration-100 cursor-pointer flex justify-center items-center p-[3px] w-fit h-fit rounded-3xl" type="button"><Image alt="search-icon" src="search.svg" width={20} height={20}></Image></button>
                        </div>
                        <FilterDropdown value={filter} onChange={setFilter} />
                        <button type="button" className="cursor-pointer hover:bg-[#2B2A38] ease-in-out duration-300 flex justify-center items-center p-[12px] w-fit h-fit rounded-3xl" onClick={handleToggleMode}><Image className="duration-300 transition-all" alt={`${icon}-icon`} src={`${icon}.svg`} width={25} height={25}></Image></button>
                    </div>
                </div>
                
                <div className="scrollbox rounded-4xl px-3 max-h-[80vh] overflow-y-auto p-5 border border-gray-500 bg-[#1F1F2B] m-7 w-[35vw] ">
                    
                    {
                        tasks.map((t) => (
                            <TaskContainer key={t.title} onDelete={handleDelte} task={t} />
                        ))
                    }
                </div>

                <button onClick={handleShowAdd} className=" fixed active:scale-90 duration-200 transition-all hover:translate-y-[-0.5rem] bottom-15 right-[29vw] z-80 cursor-pointer rounded-full p-2 bg-[#884cf7]" type="button"><Image className={`duration-400 transition-all ${showAddTask? "rotate-135": "rotate-0"}`} src="add.svg" alt="add task" height={50} width={50}></Image></button>

            </div>
            {
                showAddTask && (
                    <>
                        <div onClick={handleShowAdd} className="opacity-80 fixed inset-0 bg-black h-[100vh] w-[100vw] z-30">
                            
                        </div>
                        <div className="flex z-40 flex-col fixed translate-y-[-26vh] items-center rounded-4xl px-10 py-5 border border-gray-500 bg-[#1F1F2B] m-7 w-[35vw] ">
                            <h1 className="my-4 font-semibold text-[1.2rem]">Add New Task</h1>
                            <div className="border-white border h-[3rem] m-3 w-full rounded-4xl flex grow p-[5px]">
                                <input type="text" placeholder="Enter a new task" className="grow ml-2.5 focus:bg-none focus:border-none focus:outline-none" name="search" id="search" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                            <div className="buttons mt-7 flex w-full p-3 justify-between">
                                <PriorityDropdown value={priority} onChange={setPriority} />
                                
                                <button onClick={handleAdd} disabled={!priority || !title} className={`px-4 py-2 ${style} font-semibold rounded-[30px] flex justify-center items-center w-32`} type="button">ADD</button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>

    );
}
