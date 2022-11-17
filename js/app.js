const todoList = document.querySelector('.todo__list')
const todoInput = document.querySelector('.todo__input')
const addBtn = document.querySelector('.add__btn')

let todos = [
    {
        id: 1,
        text: 'React js',
    },
    {
        id: 2,
        text: 'Next js',
    },
    {
        id: 3,
        text: 'Gatsby js',
    },
]

let editedElementId = null
let isElementEdit = false

function renderTodos(arr) {
    todoList.innerHTML = ''
    arr.forEach((element) => {
        const el = `
        <li class="todo__item">
        <span class="todo__item-number">${element.id}.</span>
        <span class="todo__item-text">${element.text}</span>
        <button class="todo__btn remove__btn" onClick="removeItem(${element.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1)">
                <path
                    d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z">
                </path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
        </button>
        <button class="todo__btn edit__btn" onClick="editItem(${element.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1)">
                <path
                    d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z">
                </path>
            </svg>
        </button>
    </li>
        `
        todoList.insertAdjacentHTML('beforeend', el)
    })
}

function generateID(arr) {
    const lastElement = arr[arr.length - 1]
    return !arr.length ? 1 : lastElement.id + 1
}

addBtn.addEventListener('click', function () {
    if (!isElementEdit) {
        const item = {
            id: generateID(todos),
            text: todoInput.value,
        }
        todos.push(item)
    } else {
        todos = todos.map((item) => {
            return item.id === editedElementId
                ? { id: editedElementId, text: todoInput.value }
                : item
        })

        addBtn.textContent = 'Add'
    }

    todoInput.value = ''
    renderTodos(todos)
})

function removeItem(id) {
    todos = todos.filter((item) => item.id !== id)
    renderTodos(todos)
}

function editItem(id) {
    let element = todos.find((item) => item.id === id)
    todoInput.value = element.text
    editedElementId = id
    addBtn.textContent = 'Edit'
    isElementEdit = true
}

renderTodos(todos)