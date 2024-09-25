class ListItem {
    constructor(title, description, tag) {
        this.ID = Math.floor(Math.random() * 100);
        this.title = title;
        this.description = description;
        this.tag = tag;
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
const addButton = document.getElementById("add-button");
const addForm = document.getElementById("add-form");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const searchTags = document.getElementById("search-filters");
const tags = document.getElementById("tags");

renderList(LIST);

todoList.addEventListener('click', e => {
    const action = e.target?.dataset?.action;
    const itemID = e.target?.closest('.card')?.dataset?.id;

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
TAGS.forEach( el => {
    searchTags.innerHTML += `<input type="checkbox" name="sort-tags" id="sort-${el}" value=${el}><label for="sort-${el}">${el}</label>`;
    tags.innerHTML += `<input type="radio" name="tags" id=${el} value=${el}><label for=${el}>${el}</label>`;
})

tags.getElementsByTagName("input")[0].checked = true;

addButton.addEventListener("click", () => {
    addButton.classList.add("hidden");
    addForm.classList.remove("hidden");
});

saveButton.addEventListener("click", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tag = document.querySelector('input[name="tags"]:checked').value;
    const newTask = new ListItem(title, description, tag);

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
    <div class="card ${el.isDone ? "completed" : ""}" data-id='${el.ID}'>
          <span class="filter-label">${el.tag}</span>
          <div class="action-buttons">
            <i id="edit-btn" class="fa-solid fa-pen" data-action="edit"></i>
            <i class="fa-solid fa-trash" data-action="remove"></i>
          </div>
          <h2>${el.title}</h2>
          <p>${el.description}</p>
          <button id="button-done" class="primary-btn" data-action="done"><i class="fa-regular fa-circle-check"></i> ${el.isDone ? "Mark Undone" : "Mark as Done"}</button>
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



