class ListItem {
    constructor(title, description) {
        this.ID = Math.floor(Math.random() * 100);
        this.title = title;
        this.description = description;
        this.tags = ["Chores"];
        this.isDone = false;
    }
}

let LIST = JSON.parse(localStorage.getItem('todolist') || '[]');

const TAGS = [
    "Chores",
    "Work",
    "Health"
]

const todoList = document.getElementById("todo-list");
renderList(LIST);

todoList.addEventListener('click', e => {
    const action = e.target?.dataset?.action;
    const itemID = e.target?.dataset?.id;

    switch (action) {
        case 'edit':

            break
        case 'remove':
            LIST = LIST.filter(el => el.ID !== +itemID);
            localStorage.setItem('todolist', JSON.stringify(LIST));

            renderList(LIST);
            break
        case 'done':
            LIST = LIST.map(el => {
                if(el.ID === +itemID) {
                    return ({...el, isDone: !el.isDone});
                }
                return el;
            });
            localStorage.setItem('todolist', JSON.stringify(LIST));

            renderList(LIST);
            break
        default:
            return;
    }
})

const addButton = document.getElementById("add-button");
const addForm = document.getElementById("add-form");

addButton.addEventListener("click", () => {
    addButton.classList.add("hidden");
    addForm.classList.remove("hidden");
});

const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

saveButton.addEventListener("click", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const newTask = new ListItem(title, description);

    LIST.push(newTask);

    localStorage.setItem('todolist', JSON.stringify(LIST));

    clearForm();
    closeForm();
    renderList(LIST);
});

cancelButton.addEventListener("click", e => {
    e.preventDefault();
    clearForm();
    closeForm();
})

function renderList(list) {
    todoList.innerHTML = '';

    list.forEach( el => {
        todoList.innerHTML += `
    <div class="card ${el.isDone ? "completed" : ""}">
          <span class="filter-label">${el.tags}</span>
          <div class="action-buttons">
            <i id="edit-btn" class="fa-solid fa-pen" data-action="edit" data-id='${el.ID}'></i>
            <i class="fa-solid fa-trash" data-action="remove" data-id='${el.ID}'></i>
          </div>
          <h2>${el.title}</h2>
          <p>${el.description}</p>
          <button id="button-done" class="primary-btn" data-action="done" data-id='${el.ID}'><i class="fa-regular fa-circle-check"></i> Mark as Done</button>
    </div>
`
    })
}

function clearForm() {
    document.getElementById("title").value = '';
    document.getElementById("description").value = '';
}

function closeForm() {
    addButton.classList.remove("hidden");
    addForm.classList.add("hidden");
}



