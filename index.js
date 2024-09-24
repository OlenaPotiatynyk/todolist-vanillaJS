class ListItem {
    constructor(title, description) {
        this.title = title;
        this.description = description;

    }
}

const LIST = [
    {
        title: "Grocery",
        description: "Make a grocery list",
        tags: ["Chores"],
        isDone: false
    },
    {
        title: "Drink water",
        description: "Fill the bottle",
        tags: ["Health"],
        isDone: true
    }
];

const TAGS = [
    "Chores",
    "Work",
    "Health"
]

const listPlaceholder = document.getElementById("todo-list");

LIST.forEach( el => {
    listPlaceholder.innerHTML += `
    <div class="card ${el.isDone ? "completed" : ""}">
          <span class="filter-label">${el.tags}</span>
          <div class="action-buttons">
            <span>Edit</span>
            <span>Delete</span>
          </div>
          <h2>${el.title}</h2>
          <p>${el.description}</p>
          <button id="button-done" class="primary-btn">Mark as Done</button>
    </div>
`
})

const addButton = document.getElementById("add-button");
const addForm = document.getElementById("add-form");

addButton.addEventListener("click", (event) => {
    addButton.classList.add("hidden");
    addForm.classList.remove("hidden");
});

const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

saveButton.addEventListener("click", e => {
    e.preventDefault();

    LIST.push({
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        tags: [],
        isDone: false
    });

    clearForm();
});

cancelButton.addEventListener("click", e => {
    e.preventDefault();
    clearForm();
})

function clearForm() {
    document.getElementById("title").value = '';
    document.getElementById("description").value = '';
}



