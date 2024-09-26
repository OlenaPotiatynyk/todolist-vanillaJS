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
const searchInput = document.getElementById("search-input");

const activeFilters = new Set();

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
TAGS.forEach( tag => {
    searchTags.innerHTML += `<input type="checkbox" name="filter-tags" id="filter-${tag}" value=${tag} 
                                    onclick="filterByTag(${tag})"><label for="filter-${tag}">${tag}</label>`;
    tags.innerHTML += `<input type="radio" name="tags" id=${tag} value=${tag}><label for=${tag}>${tag}</label>`;
})

tags.getElementsByTagName("input")[0].checked = true;

searchInput.addEventListener("keydown", event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        renderList(LIST.filter(item => {
            if (activeFilters.size === 0) {
                return item.title.toLowerCase().includes(searchInput.value.toLowerCase())
                || item.description.toLowerCase().includes(searchInput.value.toLowerCase())
            } else {
                return (item.title.toLowerCase().includes(searchInput.value.toLowerCase())
                || item.description.toLowerCase().includes(searchInput.value.toLowerCase()))
                && activeFilters.has(item.tag)
            }
        }))
        searchInput.value = '';
    }
})

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

function filterByTag(tag) {
    if (tag) toggleActiveFilters(tag.value);

    const tags = document.querySelector('input[name="filter-tags"]:checked');
    if (!tags) renderList(LIST);
    else renderList(LIST.filter( item => activeFilters.has(item.tag)));
}

function toggleActiveFilters(tag) {
    if (activeFilters.has(tag)) activeFilters.delete(tag)
    else activeFilters.add(tag);
}



