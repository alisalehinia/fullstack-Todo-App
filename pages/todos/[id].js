import { getOneTodo } from "../api/todos/[id]";

const TodoPage = ({ todo }) => {
    return (
        <div>
            <h3>todo detail page </h3>
            <h4>title: {todo.title}</h4>
            <p>{todo.description}</p>
        </div>
    );
}

export default TodoPage;

export async function getServerSideProps(context) {
    const todo = await getOneTodo(context.query);
    console.log(todo);
    return {
        props: {
            todo: JSON.parse(JSON.stringify(todo))
        }
    }
} 