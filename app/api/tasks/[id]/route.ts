import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import mongoose, { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    priority: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

const Task = models.Task || model("Task", taskSchema);


export async function DELETE(req: Request, { params }: { params: { id:string } }) {
    try {
        await dbConnect();
        const deletedTask = await Task.findByIdAndDelete(params.id);
        console.log
        return NextResponse.json(
            { message: "Task deleted successfully", deletedTask },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to delete task", details: error.message },
            { status: 500 }
        );
    }
}