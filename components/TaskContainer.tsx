import Image from "next/image";
import { useState } from "react";
import PriorityDropdown from "./PriorityDropdown";
import { deleteTask } from "@/app/hooks/useTasks";

export default function TaskContainer({task, onDelete}: {task: any, onDelete: (task_id: string) => void}) {
    const [complete, setComplete] = useState(task.completed);

    const toggleTask = () => setComplete(!complete);

    const incompleteTask = "bg-gray-200 rounded-xl";
    const completeTask = "bg-green-400 rounded-[4px]";

    const completeTick = "scale-100 opacity-100";
    const incompleteTick = "scale-50 opacity-0";

    let color;

    if(task.priority == "High") color = "bg-red-500";
    if(task.priority == "Medium") color = "bg-yellow-500";
    if(task.priority == "Low") color = "bg-green-500";

    const handleDeleteTask = () => {
        deleteTask(task);
        onDelete(task._id);
    }
    
    return (
        <div className="flex items-center px-3 gap-2">

            <div className={`${color} my-3 p-3 px-5 grow rounded-4xl flex items-center`}>
                <div
                    className={`w-4 h-4 transition-all duration-400 flex justify-center items-center pb-[0.1em] ${complete ? completeTask : incompleteTask
                        } cursor-pointer`}
                    onClick={toggleTask}
                >
                    <div
                        className={`border-[0_0.15em_0.15em_0] border-gray-200 h-[0.6em] w-[0.35em] transition-all duration-400 ${complete ? completeTick : incompleteTick
                            } ease-in-out rotate-45`}
                    ></div>
                </div>
                
                <span className={`mx-3 ${complete? "text-gray-400": ""}`}>{complete? <s>{task.title}</s> : task.title}</span>

            </div>

            <button className="hover:bg-[#2B2A38] ease-in-out duration-300 cursor-pointer flex justify-center items-center p-[6px] w-fit h-fit rounded-3xl" type="button">
                <Image src="edit.svg" alt="edit-task" width={25} height={25}></Image>
            </button>
            <button onClick={handleDeleteTask} className="hover:bg-[#2B2A38] ease-in-out duration-300 cursor-pointer flex justify-center items-center p-[6px] w-fit h-fit rounded-3xl" type="button">
                <Image src="delete.svg" alt="delete-task" width={25} height={25}></Image>
            </button>
        </div>

    );
}
