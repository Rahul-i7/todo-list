
import { Task }  from "@/Types/taskType";

export async function addTask(task: Task) {
    const res = await fetch("../api/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task),
    });
    const data = await res.json();
    console.log("Response: ", data);
}
export async function deleteTask(task: Task) {
    const res = await fetch(`/api/tasks/${task._id}`, { method: "DELETE" });
    const data = await res.json();
    console.log("Response: ", data);
}