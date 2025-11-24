import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const tasks = await Task.find();
        return NextResponse.json({ tasks }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { title, priority } = body;

        if (!title || !priority) {
            return NextResponse.json(
                { error: "Title and priority are required" },
                { status: 400 }
            );
        }

        const newTask = new Task({ title, priority });

        await newTask.save();

        return NextResponse.json(
            { message: "Task created successfully", task: newTask },
            { status: 201 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}