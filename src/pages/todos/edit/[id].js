import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { getOneTodo } from "../../api/todos/[id]";

const UpdateTodo = ({ todo }) => {
    const [formData, setFormData] = useState({ title: todo.title, description: todo.description })
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted)
    const router = useRouter()
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`/api/todos/${router.query.id}`, { todo: { ...formData, isCompleted } }).then(res => {
            router.push("/");
        }).catch(error => console.log(error))
    }
    return (
        <form className="flex flex-col justify-start items-start" onSubmit={submitHandler}>
            <div className="flex justify-center flex-col items-start p-3">
                <label className="p-2" htmlFor="todo-title">title</label>
                <input placeholder="todo title" className="bg-white rounded-lg px-2 py-1 border border-gray-400  focus:border-blue-800 focus:border-2 focus:outline-none "
                    type="text"
                    id="todo-title"
                    name="title"
                    value={formData.title}
                    onChange={changeHandler} />

            </div>
            <div className="flex justify-center flex-col items-start p-3">
                <label className="p-2" htmlFor="todo-description">description</label>
                <textarea placeholder="description ..." className="bg-white rounded-lg px-2 py-1 border border-gray-400  focus:border-blue-800 focus:border-2 focus:outline-none "
                    type="text"
                    name="description"
                    id="todo-description"
                    value={formData.description}
                    onChange={changeHandler} >
                </textarea>
            </div>
            <div className="flex justify-center flex-col items-start p-3">
                <input className="bg-white rounded-lg px-2 py-1 border border-gray-400  focus:border-blue-800 focus:border-2 focus:outline-none "
                    type="checkbox"
                    id="todo-title"
                    name="isCompleted"
                    checked={isCompleted}
                    onChange={() => { setIsCompleted(!isCompleted) }} />

                <label className="p-2" htmlFor="todo-title">complete todo</label>
            </div>
            <div>
                <button className="px-2 py-1 bg-white text-blue-500 rounded-lg m-2" onClick={() => router.push("/")} >back</button>
                <button className="px-2 py-1 bg-blue-600 text-white rounded-lg m-2" type="submit">save changes</button>
            </div>
        </form>
    );
}

export default UpdateTodo;

export async function getServerSideProps(context) {
    const todo = await getOneTodo(context.query)

    return {
        props: {
            todo: JSON.parse(JSON.stringify(todo))
        }
    }
}