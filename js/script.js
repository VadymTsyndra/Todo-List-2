// Selectors
const todoInput = document.querySelector(".message");
const todoButton = document.querySelector(".add");
const todoList = document.querySelector(".todo");
const filterOptions = document.querySelector(".filter-todo");


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOptions.addEventListener("click", filterTodo);




//Functions

function addTodo() {
	//Todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todoDiv");
	//Create LI
	const todoLi = document.createElement("li");
	todoLi.innerText = todoInput.value;
	todoLi.classList.add("todoLi");
	todoDiv.appendChild(todoLi)
	saveLocalStorage(todoInput.value);
	//CHECK MARK BUTTON
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("completedButton");
	todoDiv.appendChild(completedButton);
	//CHECK TRASH BUTTON
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trashButton");
	todoDiv.appendChild(trashButton);
	//APPEND TO LIST
	todoList.appendChild(todoDiv);
	//CLEAR Todo INPUT VALUE
	todoInput.value = '';
}

function deleteCheck(e) {
	const item = e.target;
	//DELETE TODO
	if (item.classList.value === "trashButton") {
		const todos = item.parentElement;
		removeLocalTodos(todos);
		todos.remove();
	}
	//CHECK MARK
	if (item.classList.value === "completedButton") {
		const todos = item.parentElement;

		todos.classList.toggle("completed");

	}

}

//SELECT

function filterTodo(e) {
	const todos = todoList.childNodes;


	todos.forEach(function (todo) {
		const mStyle = todo.style;
		if (mStyle != undefined && mStyle != null) {
			switch (e.target.value) {
				case "all":
					mStyle.display = "flex";
					break;

				case "completed":
					if (todo.classList[1] === "completed") {
						mStyle.display = "flex";
					} else {
						mStyle.display = "none";
					}
					break;
				case "uncompleted":
					if (todo.classList[1] === "completed") {
						mStyle.display = "none";
					} else {
						mStyle.display = "flex";
					}
					break;
			}
		}
	});

}

function saveLocalStorage(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {

		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {

		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function (todo) {
		//Todo DIV
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todoDiv");
		//Create LI
		const todoLi = document.createElement("li");
		todoLi.innerText = todo;
		todoLi.classList.add("todoLi");
		todoDiv.appendChild(todoLi)
		//CHECK MARK BUTTON
		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("completedButton");
		todoDiv.appendChild(completedButton);
		//CHECK TRASH BUTTON
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trashButton");
		todoDiv.appendChild(trashButton);
		//APPEND TO LIST
		todoList.appendChild(todoDiv);
	})
}

function removeLocalTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {

		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const todoIndex = todo.children[0].innerText
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}



