
const item = {
    title: "Item 1",
    description: "This is something I need to do",
    status: "todo",
};

function Todo(prop)
{
    return (<>
        <div class="itemTitle">{prop.title} </div>
        <div class="itemDescription">{prop.desc}</div>
        <div class="itemStatus">{prop.status}</div>
        </>
    )
};

export default Todo;