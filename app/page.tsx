"use client"
import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import TaskContainer from "@/components/TaskContainer";
import PriorityDropdown from "@/components/PriorityDropdown";
import FilterDropdown from "@/components/FilterDropdown";
import ToggleTheme from "@/components/ToggleTheme";
import Spinner from "@/components/Spinner";

interface Task {
    _id: string;
    title: string;
    priority: string;
    completed: boolean;
}

export default function Home() {

    const [searchTask, setSearchTask] = useState("");
    const [showAddTask, setShowAddTask] = useState(false);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [filter, setFilter] = useState("All");

    const [tasks, setTasks] = useState<Task[]>([]);
    const fetchTasks = async () => {
        try {
            const res = await fetch("/api/tasks");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setTasks(data.tasks);
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleShowAdd = () => {
        setShowAddTask(!showAddTask);
    }

    const handleAdd = () => {
        const task = { title, priority, completed: false };
        fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        fetchTasks();
        setTitle("");
        setPriority("");
        setShowAddTask(false);
    }
    const handleDelete = async (taskID: string) => {
        const previousTasks = [...tasks];
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskID));

        try {
            const response = await fetch(`/api/tasks/${taskID}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
        } catch (error) {
            console.error("Failed to delete task:", error);
            setTasks(previousTasks);
            alert("Failed to delete task. Please try again.");
        }
    }

    const handleComplete = async (task: Task) => {
        const previousTasks = [...tasks];
        // Optimistic update: immediately toggle completion status
        setTasks(prevTasks => prevTasks.map(t =>
            t._id === task._id ? { ...t, completed: !t.completed } : t
        ));

        try {
            const response = await fetch(`/api/tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed: !task.completed })
            });

            if (!response.ok) {
                throw new Error("Failed to toggle complete task");
            }
        } catch (error) {
            console.error("Failed to toggle complete task:", error);
            setTasks(previousTasks);
            alert("Failed to toggle complete task. Please try again.");
        }
    }

    // Filter tasks based on selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === "Completed") return task.completed;
        if (filter === "Incomplete") return !task.completed;
        return true; // "All"
    });

    let style;
    if (!priority || !title) style = "border cursor-not-allowed border-[#884cf7] text-[#884cf7]"
    else style = "cursor-pointer bg-[#884cf7]"

    return (
        <div className="h-[100vh] bg-[#14141E] flex justify-center items-center">
            <div className="flex flex-col items-center h-[90vh] w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[60vw] xl:w-[50vw] border border-gray-400 rounded-4xl bg-[#181822] absolute">
                <div className="flex flex-col w-full px-4 sm:px-6 md:px-8 items-center">
                    <h1 className="my-5 sm:my-7 font-bold text-lg sm:text-[1.2rem]">TODO LIST</h1>
                    <div className="flex flex-col sm:flex-row w-full items-center gap-2.5 px-2 sm:px-3 justify-between">
                        <div className="border-white border rounded-4xl flex grow p-[5px] w-full sm:w-auto">
                            <input type="text" className="grow ml-2.5 bg-transparent text-white placeholder:text-gray-400 focus:border-none focus:outline-none" name="search" id="search" value={searchTask} onChange={(e) => { setSearchTask(e.target.value) }} />
                            <button className="hover:bg-[#313131] ease-in-out duration-100 cursor-pointer flex justify-center items-center p-[3px] w-fit h-fit rounded-3xl" type="button"><Search className="w-5 h-5" /></button>
                        </div>
                        <FilterDropdown value={filter} onChange={setFilter} />
                        <ToggleTheme />
                    </div>
                </div>

                <div className="scrollbox rounded-4xl px-3 max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto p-3 sm:p-5 border border-gray-500 bg-[#1F1F2B] m-4 sm:m-7 w-full sm:w-[75vw] md:w-[65vw] lg:w-[50vw] xl:w-[35vw]">
                    {loading && (<Spinner></Spinner>)}
                    {!loading && filteredTasks.length === 0 && (
                        <p className="text-center text-gray-400 py-4">
                            {tasks.length === 0 ? "No tasks found" : `No ${filter.toLowerCase()} tasks`}
                        </p>
                    )}
                    {!loading && filteredTasks.map((t) => (
                        <TaskContainer key={t._id} onDelete={handleDelete} onComplete={handleComplete} task={t} />
                    ))}
                </div>

                <button onClick={handleShowAdd} className="fixed active:scale-90 duration-200 transition-all hover:translate-y-[-0.5rem] bottom-6 right-6 sm:bottom-10 sm:right-10 md:right-[15vw] lg:right-[20vw] xl:right-[29vw] z-80 cursor-pointer rounded-full p-2 bg-[#884cf7]" type="button"><Plus className={`duration-400 transition-all ${showAddTask ? "rotate-45" : "rotate-0"} w-12 h-12`} /></button>

            </div>
            {
                showAddTask && (
                    <>
                        <div onClick={handleShowAdd} className="opacity-80 fixed inset-0 bg-black h-[100vh] w-[100vw] z-30">

                        </div>
                        <div className="flex z-40 flex-col fixed translate-y-[-20vh] sm:translate-y-[-26vh] items-center rounded-4xl px-6 sm:px-10 py-5 border border-gray-500 bg-[#1F1F2B] m-4 sm:m-7 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw]">
                            <h1 className="my-4 font-semibold text-lg sm:text-[1.2rem]">Add New Task</h1>
                            <div className="border-white border h-[3rem] m-3 w-full rounded-4xl flex grow p-[5px]">
                                <input type="text" placeholder="Enter a new task" className="grow ml-2.5 bg-transparent text-white placeholder:text-gray-400 focus:bg-none focus:border-none focus:outline-none" name="search" id="search" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                            <div className="buttons mt-7 flex flex-col sm:flex-row gap-3 sm:gap-0 w-full p-3 justify-between">
                                <PriorityDropdown value={priority} onChange={setPriority} />

                                <button onClick={handleAdd} disabled={!priority || !title} className={`px-4 py-2 ${style} font-semibold rounded-[30px] flex justify-center items-center w-full sm:w-32`} type="button">ADD</button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>

    );
}
