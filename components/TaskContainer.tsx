import { Pencil, Trash2 } from "lucide-react";

export default function TaskContainer({ task, onDelete, onComplete }: { task: any, onDelete: (taskId: string) => void, onComplete: (task: any) => void }) {
    const incompleteTask = "bg-gray-200 rounded-xl";
    const completeTask = "bg-green-400 rounded-[4px]";

    const completeTick = "scale-100 opacity-100";
    const incompleteTick = "scale-50 opacity-0";

    let color;

    if (task.priority == "High") color = "bg-red-500";
    if (task.priority == "Medium") color = "bg-yellow-500";
    if (task.priority == "Low") color = "bg-green-500";

    const handleDeleteTask = () => {
        onDelete(task._id);
    }

    const handleToggleComplete = () => {
        onComplete(task);
    }

    return (
        <div className="flex items-center px-2 sm:px-3 gap-1 sm:gap-2">

            <div className={`${color} my-2 sm:my-3 p-2 sm:p-3 px-3 sm:px-5 grow rounded-4xl flex items-center`}>
                <div
                    className={`w-4 h-4 transition-all duration-400 flex justify-center items-center pb-[0.1em] ${task.completed ? completeTask : incompleteTask
                        } cursor-pointer`}
                    onClick={handleToggleComplete}
                >
                    <div
                        className={`border-[0_0.15em_0.15em_0] border-gray-200 h-[0.6em] w-[0.35em] transition-all duration-400 ${task.completed ? completeTick : incompleteTick
                            } ease-in-out rotate-45`}
                    ></div>
                </div>

                <span className={`mx-2 sm:mx-3 text-sm sm:text-base ${task.completed ? "text-gray-400" : ""}`}>{task.completed ? <s>{task.title}</s> : task.title}</span>

            </div>

            <button className="hover:bg-[#2B2A38] ease-in-out duration-300 cursor-pointer flex justify-center items-center p-[6px] w-fit h-fit rounded-3xl" type="button">
                <Pencil className="w-6 h-6" />
            </button>
            <button onClick={handleDeleteTask} className="hover:bg-[#2B2A38] ease-in-out duration-300 cursor-pointer flex justify-center items-center p-[6px] w-fit h-fit rounded-3xl" type="button">
                <Trash2 className="w-6 h-6" />
            </button>
        </div>

    );
}
