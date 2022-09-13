import dbConnect from "@/server/utils/dbconnect";
import Todo from '@/server/models/todo'
dbConnect()
export default async function handler(req, res) {

    if (req.method === "GET") {
        const todos = await Todo.find({});
        return res.status(200).json({ todos })
    }
    else if (req.method === "POST") {
        await Todo.create({ title: req.body.formData.title, description: req.body.formData.description });
        const todos = await Todo.find({});
        return res.status(201).json({ message: "create new todo", todos })
    }
}