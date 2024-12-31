const task=document.querySelector('.input-text');
const addBtn=document.querySelector('.add-task');
const taskList=document.querySelector('.tasks');

let editingTask = null;

addBtn.addEventListener('click', () => {
    // console.log(addBtn.innerHTML);
    if(task.value==''){
        alert("Add a task!");
        console.log("Salam alaikum")
        return;
    }
    if(addBtn.innerHTML=="Add"){
        const list=document.createElement('li');
        list.className='taskName';
        const p = document.createElement('p');
        p.innerHTML=task.value.trim();
        // console.log(p);
        list.appendChild(p);
        document.querySelector('.input-text').value='';
        
        saveLocalTodos(p.innerHTML);
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
            editingTask.querySelector('p').textContent = task.value.trim();
            // Reset edit mode
            editingTask = null;
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
        
        // task.value=e.target.previousElementSibling.innerHTML;
    }
}

const saveLocalTodos = (todo) =>{
    let todos=[todo];
    console.log(todos);

}

taskList.addEventListener('click', handleActions);



