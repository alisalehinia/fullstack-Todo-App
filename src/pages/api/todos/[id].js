import dbConnect from "@/server/utils/dbConnect";
import Todo from '@/server/models/todo'
dbConnect();
export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === "DELETE") {
        await Todo.findByIdAndDelete(id);
        const todos = await Todo.find({});
        return res.status(200).json({ message: "delete successful", todos })
    }
    else if (req.method === "GET") {
        const todo = await getOneTodo(req.query);
        return res.status(200).json({ message: "todo loaded", todo })
    }
    else if (req.method === "PUT") {
        const todo = await Todo.findById(req.query.id);
        todo.title = req.body.todo.title;
        todo.description = req.body.todo.description;
        todo.isCompleted = req.body.todo.isCompleted;
        await todo.save();
        return res.status(200).json({ message: "update successful", todo })
    }

}
export async function getOneTodo(query) {
    const todo = await Todo.findById(query.id);
    return todo;
}