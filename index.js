const LIST = [
    {
        title: "Купити продукти",
        description: "Скласти список необхідних продуктів",
        tags: ["Домашні справи"],
        isDone: false
    },
    {
        title: "Випити водички",
        description: "Налити водичку в бутилку",
        tags: ["Фітнес"],
        isDone: true
    }
];

const TAGS = [
    "Домашні справи",
    "Робота",
    "Фітнес"
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
          <button id="button-done" class="primary-btn">Завершити</button>
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



