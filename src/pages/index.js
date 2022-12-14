import axios from "axios"
import { useEffect, useState } from "react";
import useSWR from "swr";
import AddNewTodo from "@/components/AddNewTodo";
import Link from "next/link";
import Todo from '@/server/models/todo'
import Layout from "@/containers/Layout";
import dbConnect from "@/server/utils/dbConnect";

export default function Home({ todos }) {
  const [data, setData] = useState(todos)

  console.log(data);


  const deleteTodo = (id) => {
    console.log(id);
    axios.delete(`/api/todos/${id}`).then(res => {
      setData(res.data.todos)
    }).catch(err => console.log(err))
  }
  const addTodo = (e, formData) => {
    e.preventDefault()
    axios.post("/api/todos/", { formData }).then(res => {
      setData(res.data.todos)
    }).catch(err => console.log(err))
    console.log(formData);
  }
  const completeHandler = (todoId) => {
    axios.put(`/api/todos/complete/${todoId}`).then(res => {
      console.log(res);
      setData(res.data.todos);
    }).catch(err => console.log(err))
  }
  return (


    <Layout>
      <section className="bg-gray-100 flex flex-col md:flex-row justify-between">
        <AddNewTodo submitHandler={addTodo} />
        <div className="flex flex-col justify-start items-center p-4 flex-1">
          {
            data.map(todo => {
              return <div key={todo._id} className="flex justify-between items-center px-4 w-full py-4 bg-white m-2 rounded-md">
                <Link href={`/todos/${todo._id}`}>
                  <a>
                    <div className={`${todo.isCompleted ? "line-through" : ""}`}>
                      {todo.title}
                    </div>
                  </a>
                </Link>
                <div className="flex justify-between items-center gap-2">
                  <button onClick={() => completeHandler(todo._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button onClick={() => deleteTodo(todo._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <Link href={`/todos/edit/${todo._id}`}>
                    <a >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>
                    </a>
                  </Link>
                </div>

              </div>
            })
          }
        </div>

      </section >
    </Layout>


  )
}
export async function getServerSideProps() {
  dbConnect();
  const todos = await Todo.find({});
  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos))
    }
  }
}