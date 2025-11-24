import { model, models, Schema } from "mongoose";

const taskSchema = new Schema({
    title: String,
    priority: String,
    completed: {type: Boolean, default: false}
});

export default models.Task || model("Task", taskSchema);