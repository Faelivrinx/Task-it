const addTaskButton = document.querySelector(".add");
const input = document.querySelector('.write-task');
const ul = document.querySelector("ul");

let taskId = 0;
const todoList = [];

const remove = (e, id) => {
    console.log("Szukam itemu o id: " + id);
    console.log(todoList);
    const index = todoList.findIndex(x => x.id == id);
    todoList.splice(index, 1);

    displayTasks();
}

const addTask = (e) => {
    todoList.push({
        id: taskId,
        content: input.value,
        complete: false
    });
    taskId++;
    input.value = "";
    displayTasks();
}

const markDone = (e, id) => {
    setTimeout(() => {
        const index = todoList.findIndex(x => x.id == id);
        todoList[index].complete = true;
        const parent = e.target.parentNode;
        e.target.remove();
        const i = document.createElement('i');
        i.className = "material-icons";
        i.textContent = "delete";
        parent.appendChild(i);
        parent.parentNode.className = "item done";
        i.addEventListener("click", function (e) {
            remove(e, id);
        });    
    }, 3000);
    

}
const displayTasks = () => {
    ul.textContent = "";
    todoList.forEach((taskItem) => {
        const task = document.createElement('li');
        const toDo = document.createElement("span")
        const p = document.createElement("p");
        const actionButton = document.createElement("span")
        p.textContent = taskItem.content;
        toDo.className = "item-status";
        actionButton.className = "item-action"

        if (taskItem.complete == true) {
            task.className = "item done";
            toDo.textContent = "Done";
            const i = document.createElement('i');
            i.className = "material-icons";
            i.textContent = "delete";
            actionButton.appendChild(i);
            i.addEventListener("click", function (e) {
                remove(e, taskItem.id);
            });
        } else {
            const checkbox = document.createElement("input");
            checkbox.className = "done-checkbox";
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function (e) {
                markDone(e, taskItem.id);
            });
            task.className = "item";
            toDo.textContent = "To Do";
            actionButton.appendChild(checkbox);
        }
        task.appendChild(toDo);
        task.appendChild(p);
        task.appendChild(actionButton);
        ul.appendChild(task);
    })
    console.log(todoList);
}

addTaskButton.addEventListener('click', addTask)



