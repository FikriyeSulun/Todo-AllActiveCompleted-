const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');

function addTodo(event) {
    event.preventDefault();
    // alert(todoInput.value);
    console.log(todoInput.value);
    if (todoInput.value === '') {
        alert('boş todo girilemez');
        return;
    }
    // todoList.innerHTML += `<li>
    //     <div class="view">
    //     <input type="checkbox" onclick="markTodo(this)" class="toggle">
    //     <label> ${todoInput.value}</label>
    //     <button class="destroy" onclick="removeTodo(this)"></button>
    //     </div>
    // <input class="edit" value="${todoInput.value}"></li>`;
    // todoInput.value = ''; 

    todoList.innerHTML += `<li>
        <div class="view">
        <input type="checkbox" class="toggle">
        <label class="todoLabel"> ${todoInput.value}</label>
        <button class="destroy"></button>
        </div>
    <input class="edit" value="${todoInput.value}"></li>`;
    todoInput.value = '';

    // bindClicks();


    //yeni Todoları başa eklemek için alttaki iki yazım şeklini kullanabiliriz.

    // todoList.innerHTML = `<li>
    //     <div class="view">
    //     <input type="checkbox" class="toggle">
    //     <label> ${todoInput.value}</label>
    //     <button class="destroy"></button>
    //     </div>
    // <input class="edit" value="${todoInput.value}"></li>` + todoList.innerHTML;
    // todoInput.value = '';

    // todoList.innerHTML = `<li>
    //     <div class="view">
    //     <input type="checkbox" class="toggle">
    //     <label> ${todoInput.value}</label>
    //     <button class="destroy"></button>
    //     </div>
    // <input class="edit" value="${todoInput.value}"></li> ${todoList.innerHTML}`;
    // todoInput.value = '';

}

todoForm.addEventListener('submit', addTodo);

for (const filter of document.querySelectorAll('.filters input')) {
    filter.addEventListener('click', function () {
        // todoList.dataset.filter = this.value;

        todoList.classList.value = 'todo-list ' + this.value;

        //diğer alternatif
        // todoList.classList.value = 'todo-list';
        // todoList.classList.add(this.value);

        //çok uzun versiyon
        // if (this.value === 'completed'){
        //     todoList.classList.add('copleted');
        //     todoList.classList.add('active');
        // }
        // else if(this.value === 'all'){
        //     todoList.classList.add('copleted');
        //     todoList.classList.add('active');
        // }
        // else if(this.value === 'active'){
        //     todoList.classList.add('active');
        // }


        // alert(this.value);
    })
};



function markTodo(el) {
    el.parentElement.parentElement.classList.toggle('completed');
}

function removeTodo(el) {
    el.parentElement.parentElement.remove();
}

function showTodoEdit(el) {
    el.parentElement.parentElement.classList.add('editing');
    const currValue = el.nextElementSibling.value;
    el.nextElementSibling.value = '';
    el.nextElementSibling.value = currValue;
    el.nextElementSibling.focus();
}

function editTodo(e) {
    if(e.key === 'Enter'){
        this.previusElementSibling.querySelector('label').innerText = this.value;
        this.parentElement.classList.remove('editing');
    }
}

// 1- yeni eleman eklendiğinde eventleri bağlamak -- en mantıksız olan bu
// 2- delegate etmek -- her koşulda çalışır
// 3- create element ile oluşturmak -- bunun sağlıklı çalışması için mutlaka bir data havuzuna bağlamak lazım

// event delegation
todoList.addEventListener('click', delegateClick);
function delegateClick(e) {
    // if(e.target.className === 'destroy'){
    //     e.target.parentElement.parentElement.remove();
    // }

    const targetEl = e.target;
    if (targetEl.classList.contains('destroy')) {
        removeTodo(targetEl);
    }
    if (targetEl.classList.contains('toggle')) {
        markTodo(targetEl);
    }
}

todoList.addEventListener('dblclick', delegateDblClick);
function delegateDblClick(e) {
    const targetEl = e.target;
    if (targetEl.classList.contains('todoLabel')) {
        showTodoEdit(targetEl);
    }
}

todoList.addEventListener('keydown', delegateKeydown);
function delegateKeydown(e) {
    const targetEl = e.target;
    if (targetEl.classList.contains('todoLabel')) {
        editTodo(targetEl);
    }
}


//dblclick
//keydown -> her tuşa basıldığında çalışır




// //delegation alternatifi

// function markTodo() {
//     this.parentElement.parentElement.classList.toggle('completed');
// }

// function removeTodo() {
//     this.parentElement.parentElement.remove();
// }

// function showTodoEdit() {
//     this.parentElement.classList.add('editing');

//     const currValue = this.nextElementSibling.value;
//     this.nextElementSibling.value = '';
//     this.nextElementSibling.value = currValue;
//     this.nextElementSibling.focus();
// }

// function editTodo(e) {
//     if(e.key === 'Enter'){
//         this.previusElementSibling.querySelector('label').innerText = this.value;
//         this.parentElement.classList.remove('editing');
//     }
// }

// //bind -> bağlamak
// function bindClicks(){
//     for(const btn of document.querySelectorAll('.destroy')){
//         btn.addEventListener('click', removeTodo);
//     }
//     for(const btn of document.querySelectorAll('.toggle')){
//         btn.addEventListener('click', markTodo);
//     }

//     document.querySelectorAll('.view').forEach(x => x.addEventListener('dblclick', showTodoEdit));
//     document.querySelectorAll('.view').forEach(x => x.addEventListener('keydown', editTodo));

// }
// bindClicks();