class ListItem {
    constructor(title, description) {
        this.ID = Math.floor(Math.random() * 100);
        this.title = title;
        this.description = description;
        this.tags = [];
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
    const itemID = e.target?.dataset?.id;
    LIST = LIST.filter(el => el.ID !== +itemID);
    localStorage.setItem('todolist', JSON.stringify(LIST));

    renderList(LIST);
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
})

function renderList(list) {
    todoList.innerHTML = '';

    list.forEach( el => {
        todoList.innerHTML += `
    <div class="card ${el.isDone ? "completed" : ""}">
          <span class="filter-label">${el.tags}</span>
          <div class="action-buttons">
            <i id="edit-btn" class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash" data-id='${el.ID}'></i>
          </div>
          <h2>${el.title}</h2>
          <p>${el.description}</p>
          <button id="button-done" class="primary-btn"><i class="fa-regular fa-circle-check"></i> Mark as Done</button>
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



