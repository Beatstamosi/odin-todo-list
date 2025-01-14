import "./styles.css";

// pop up form to add task
const dialogTask = document.querySelector("#dialog-add-task");
const addTaskButton = document.querySelector("#add-task");

addTaskButton.addEventListener("click", () => {
    dialogTask.showModal();
})

// pop up form to add project
const dialogProject = document.querySelector("#dialog-add-project");
const addProjectButton = document.querySelector("#add-project");

addProjectButton.addEventListener("click", () => {
    dialogProject.showModal();
})