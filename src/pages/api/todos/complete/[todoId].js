import dbConnect from '@/server/utils/dbConnect'
import Todo from '@/server/models/todo'
dbConnect();
export default async function handler(req, res) {
    if (req.method === "PUT") {
        const todo = await Todo.findById(req.query.todoId);
        todo.isCompleted = !todo.isCompleted;
        todo.save();
        const todos = await Todo.find({});
        return res.status(200).json({ message: " done", todos })
    }
}
