const alert = document.querySelector('.alert')
const form = document.querySelector('.todo-form')
const todo = document.getElementById('todo')
const description = document.getElementById('description')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.todo-container')
const list = document.querySelector('.todo-list')
const clearBtn = document.querySelector('.clear-btn')

let editElement
let editFlag = false
let editID = ''
const APP_URL = "http://localhost:8888"

form.addEventListener('submit', addItem) 

window.addEventListener('DOMContentLoaded', setupItems)

async function makeAPICall(url = '', method="POST", data = null) {
    if (data){
        data = JSON.stringify(data)
    }
    // Default options are marked with *
    const response = await fetch(APP_URL+url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  


function addItem(e) {
    e.preventDefault()
    const title = todo.value
    const desc = description.value

    if (!title){
        displayAlert('Please enter value','danger')
        return
    }
    
    if (!editFlag) { 
        makeAPICall(`/todo`, 'POST', { "Title":title, "Description": desc })
            .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            displayAlert('Todo added to the list', 'success')
            container.classList.add('show-container')
            createListItem(data.id, data.Title, data.Description)
        });
        setBackToDefault()
    } else if (editFlag) {
        makeAPICall(`/todo/${editID}`, 'PUT', { "Title":title,  "Description": desc })
            .then(data => {
                editElement.innerHTML = title
                displayAlert('Todo edited', 'success')
                setBackToDefault()
        })
    }
}

function displayAlert(text, color) {
    alert.textContent = text
    alert.classList.add(`alert-${color}`)

    setTimeout(() => {
        alert.textContent = ''
        alert.classList.remove(`alert-${color}`)
    }, 1000)
}

function deleteTodo(e) {
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    makeAPICall(`/todo/${id}`, "DELETE").then((data) => {
        list.removeChild(element)
        if (list.children.length === 0) {
            container.classList.remove('show-container')
        }
        displayAlert('Todo deleted', 'danger')
        setBackToDefault()
    })    
}

function editTodo(e) {
    const element = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling
    editID = element.dataset.id
    makeAPICall(`/todo/${editID}`, "GET").then((data) => {
        data = data[0]
        todo.value = data.Title
        description.value = data.Description
        editFlag = true
        submitBtn.textContent = 'edit'
    })
}

function setBackToDefault() {
    todo.value = ''
    editFlag = false
    editID = ''
    submitBtn.textContent = 'Submit'
}

function setupItems(){
    makeAPICall("/todo", "GET").then((data) => {
        console.log(data)
        if (data.length > 0) {
            data.forEach(item => {
                createListItem(item.id, item.Title, item.Description)
            })
            container.classList.add('show-container')
        }
       
    })  
}

function createListItem(id, value, description) {
    const element = document.createElement('article')
        element.classList.add('todo-item')
        const attr = document.createAttribute('data-id')
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `
            <p class="title">${value}
            <br/> ${description}
            </p>
            <div class="btn-container">
                <button type='button' class='edit-btn'>
                    <i class='fas fa-edit'></i>
                </button>
                <button type='button' class='delete-btn'>
                    <i class='fas fa-trash'></i>
                </button>
            </div>
        `
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteTodo)
        editBtn.addEventListener('click', editTodo)
        list.appendChild(element)
}