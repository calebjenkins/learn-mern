import Todo from "./Todo";

const items = {
    title: "Item 1",
    description: "This is something I need to do",
    status: "todo",
};



function TodoList()
{
    return (<>
        <ul class="ToDoList">
            <li><Todo title="Number 1" desc="This is a thing todo" status="done" /></li>
            <li><Todo title="Number 2" desc="This is another thing" status="inprogress" /></li>
            <li><Todo titel="Number 3" desc="stretch goal!!" status="todo" /></li>
        </ul>
        </>
    )
};

export default TodoList;