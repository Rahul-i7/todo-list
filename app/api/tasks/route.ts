import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import mongoose, { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    priority: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

const Task = models.Task || model("Task", taskSchema);

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { title, priority, completed } = body;

        if (!title || !priority) {
            return NextResponse.json(
                { error: "Title and priority are required" },
                { status: 400 }
            );
        }

        const newTask = await Task.create({
            title,
            priority,
            completed: completed || false,
        });

        return NextResponse.json(
            { message: "Task added successfully", task: newTask },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to add task", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();

        const tasks = await Task.find();

        return NextResponse.json(
            { tasks },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
