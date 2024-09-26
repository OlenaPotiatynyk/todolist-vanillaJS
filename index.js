class ListItem {
    constructor(title, description, tag) {
        this.ID = Date.now();
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
            const item = LIST.find(el => el.ID === +itemID);
            if (item) {
                document.getElementById("title").value = item.title;
                document.getElementById("description").value = item.description;
                document.querySelector(`input[name="tags"][value="${item.tag}"]`).checked = true;
                addForm.classList.remove("hidden");
                addButton.classList.add("hidden");

                LIST = LIST.filter(el => el.ID !== +itemID); // Remove old item to replace on save
            }
            break
        case 'remove':
            LIST = LIST.filter(el => el.ID !== +itemID);
            setListToLocalStorage();

            renderList(LIST);
            break
        case 'done':
            LIST = LIST.map(el => {
                if(el.ID === +itemID) {
                    return ({...el, isDone: !el.isDone});
                }
                return el;
            });
            setListToLocalStorage();

            renderList(LIST);
            break
        default:
            return;
    }
})
TAGS.forEach(tag => {
    // Create elements for search filters (checkboxes)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'filter-tags';
    checkbox.id = `filter-${tag}`;
    checkbox.value = tag;
    checkbox.onclick = () => filterByTag(tag); // Add event listener

    const labelCheckbox = document.createElement('label');
    labelCheckbox.htmlFor = `filter-${tag}`;
    labelCheckbox.textContent = tag;

    // Append the checkbox and label to the searchTags container
    searchTags.appendChild(checkbox);
    searchTags.appendChild(labelCheckbox);

    // Create elements for task tags (radio buttons)
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'tags';
    radio.id = tag;
    radio.value = tag;

    const labelRadio = document.createElement('label');
    labelRadio.htmlFor = tag;
    labelRadio.textContent = tag;

    // Append the radio button and label to the tags container
    tags.appendChild(radio);
    tags.appendChild(labelRadio);
});

// Set the first radio button as checked by default
tags.getElementsByTagName('input')[0].checked = true;


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
    setListToLocalStorage();
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
    todoList.innerHTML = ''; // Clear the list

    list.forEach(el => {
        const card = document.createElement('div');
        card.className = `card ${el.isDone ? "completed" : ""}`;
        card.dataset.id = el.ID;

        card.innerHTML = `
            <span class="filter-label">${el.tag}</span>
            <div class="action-buttons">
              <i class="fa-solid fa-pen" data-action="edit"></i>
              <i class="fa-solid fa-trash" data-action="remove"></i>
            </div>
            <h2>${el.title}</h2>
            <p>${el.description}</p>
            <button class="primary-btn" data-action="done">
              <i class="fa-regular fa-circle-check"></i> ${el.isDone ? "Mark Undone" : "Mark as Done"}
            </button>
        `;
        todoList.appendChild(card); // Append the card to the list
    });
}

function clearForm() {
    document.getElementById("title").value = '';
    document.getElementById("description").value = '';
}

function closeForm() {
    addButton.classList.remove("hidden");
    addForm.classList.add("hidden");
}

function filterByTag(el) {
    if (el) toggleActiveFilters(el);

    const tags = document.querySelector('input[name="filter-tags"]:checked');
    if (!tags) renderList(LIST); // This will render the list if no tags are checked
    else renderList(LIST.filter( item => activeFilters.has(item.tag)));
}

function toggleActiveFilters(tag) {
    if (activeFilters.has(tag)) activeFilters.delete(tag)
    else activeFilters.add(tag);
}

function setListToLocalStorage() {
    localStorage.setItem('todolist', JSON.stringify(LIST));
}



