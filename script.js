const task=document.querySelector('.input-text');
const addBtn=document.querySelector('.add-task');
const taskList=document.querySelector('.tasks');

let editingTask = null;

addBtn.addEventListener('click', () => {
    // console.log(addBtn.innerHTML);
    if(task.value==''){
        alert("Add a task!");
        return;
    }
    if(addBtn.innerHTML=="Add"){
        const list=document.createElement('li');
        list.className='taskName';
        const p = document.createElement('p');
        p.innerHTML=task.value.trim();
        // console.log(p);
        list.appendChild(p);
        
        // saving to local storage
        saveLocalTodos(task.value);
        document.querySelector('.input-text').value='';
        

        //creating a edit button
        const edit=document.createElement('button');
        edit.innerHTML='Edit';
        edit.classList='edit-btn'
        edit.addEventListener('click', ()=> {
            console.log("edit");
        })
        list.appendChild(edit);

        //creating a remove button
        const remove=document.createElement("button");
        remove.classList='remove-btn';
        remove.innerHTML='Remove';
        // or, remove.textContent='Remove';
        remove.addEventListener('click', ()=>{
            console.log("remove");
        })
        list.appendChild(remove);
        
        taskList.appendChild(list);
    }
    else{
        if(editingTask){
            const oldText = editingTask.querySelector('p').textContent;
            const newText = task.value.trim();
            
            // Update the UI
            editingTask.querySelector('p').textContent = newText;
            
            // Update localStorage
            let todos = JSON.parse(localStorage.getItem("todos"));
            const taskIndex = todos.indexOf(oldText);
            if(taskIndex !== -1) {
                todos[taskIndex] = newText;
                localStorage.setItem("todos", JSON.stringify(todos));
            }
            
            addBtn.innerHTML = "Add";
        }
    }
    
    task.value='';
})

// Updated TODO after REMOVE operation
function handleActions(e){

    // console.log(e.target);
    if(e.target.innerHTML=='Remove'){
        // console.log(e.target.parentElement);

        //very IMP
        taskList.removeChild(e.target.parentElement);

        deleteLocalTodo(e.target.parentElement);

        // If removing a task that's being edited, reset the edit mode
        if (editingTask === e.target.parentElement) {
            editingTask = null;
            addBtn.textContent = "Add";
            task.value = '';
        }
    }
    else if(e.target.innerHTML=='Edit'){
        //store the element that is being edited
        editingTask=e.target.parentElement;

        const currentText=e.target.parentElement.querySelector('p').textContent;
        
        task.value=currentText;
        addBtn.textContent="Edit";
        
        // console.log(currentText);
        // editLocalTodo(currentText);
        // task.value=e.target.previousElementSibling.innerHTML;
    }
}

const saveLocalTodos = (todo) =>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const getLocalTodos = ()=> {
    //to extract the list from LocalStorage and show the on the screen
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todoTasks => {
            console.log(todoTasks);
            const list=document.createElement('li');
            list.className='taskName';
            const p = document.createElement('p');
            p.innerHTML=todoTasks;
            // console.log(p);
            list.appendChild(p);
        
            //creating a edit button
            const edit=document.createElement('button');
            edit.innerHTML='Edit';
            edit.classList='edit-btn'
            edit.addEventListener('click', ()=> {
                console.log("edit");
            })
            list.appendChild(edit);
        
            //creating a remove button
            const remove=document.createElement("button");
            remove.classList='remove-btn';
            remove.innerHTML='Remove';
            remove.addEventListener('click', ()=>{
                console.log("remove");
            })
            list.appendChild(remove);
            
            taskList.appendChild(list);
            
        });
    }
}

const deleteLocalTodo = (todoTask) =>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
        // console.log(todoTask.children[0].innerHTML);
        const taskName=todoTask.children[0].innerHTML;
        const taskIndex=todos.indexOf(taskName);
        console.log(taskIndex);
        todos.splice(taskIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

const editLocalTodo = (todoTask) =>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let taskIndex=todos.indexOf(todoTask);
    todos[taskIndex]=task.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
taskList.addEventListener('click', handleActions);
saveLocalTodos

