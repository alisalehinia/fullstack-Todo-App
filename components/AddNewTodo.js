import { useState } from "react";

const AddNewTodo = ({ submitHandler }) => {
    const [formData, setFormData] = useState({ title: "", description: "" })
    const [isShow, setIsShow] = useState(false)
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    if (!isShow) {
        return <button className="px-2 py-1 bg-blue-500 text-white rounded-lg m-2" onClick={() => setIsShow(true)} >add new Todo ?</button>
    }
    return (
        <form className="flex flex-col justify-start items-start" onSubmit={(e) => submitHandler(e, formData)}>
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
            <div>
                <button className="px-2 py-1 bg-white text-blue-500 rounded-lg m-2" onClick={() => setIsShow(false)} >cancel</button>
                <button className="px-2 py-1 bg-blue-600 text-white rounded-lg m-2" type="submit">add new todo</button>
            </div>
        </form>
    );
}

export default AddNewTodo;