import { toDoList } from "./globalToDoList";

export function checkProjectNameExists() {
    const projectNameInput = document.querySelector("#name-project");
    const submitProjectBtn = document.querySelector("#add-project");

    projectNameInput.addEventListener("keyup", () => {
        let existingProjectNames = toDoList.retrieveFromLocalStorage();
        let projectExists = existingProjectNames.some(project => project.name === projectNameInput.value)

        if (projectExists) {
            projectNameInput.setCustomValidity("Project Name already exists.");
            submitProjectBtn.disabled = true;
            submitProjectBtn.style.backgroundColor = "var(--softGray)";
            projectNameInput.style.border = "1px solid var(--red)";
        } else {
            projectNameInput.setCustomValidity("");
            submitProjectBtn.disabled = false;
            submitProjectBtn.style.backgroundColor = "var(--lightTeal)";
            projectNameInput.style.border = "none";
        }

        projectNameInput.reportValidity();
    });
}

export function checkTaskNameInsideProjectExists() {
    const taskNameInput = document.querySelector("#name-task");
    const submitTaskButton = document.querySelector("#add-task");
    let select = document.querySelector("#assign-to-project");
    let taskExistsInsideProject;

    const checkTaskName = function() {
        let existingProjectNames = toDoList.retrieveFromLocalStorage();
        let projectExists = existingProjectNames.find(project => project.name === select.value);

        if (projectExists) {
            taskExistsInsideProject = projectExists.tasks.some(task => task.name === taskNameInput.value);
        }

        if (taskExistsInsideProject) {
            taskNameInput.setCustomValidity("Project Name already exists.");
            submitTaskButton.disabled = true;
            submitTaskButton.style.backgroundColor = "var(--softGray)";
            taskNameInput.style.border = "1px solid var(--red)";
        } else {
            taskNameInput.setCustomValidity("");
            submitTaskButton.disabled = false;
            submitTaskButton.style.backgroundColor = "var(--lightTeal)";
            taskNameInput.style.border = "none";
        }

        taskNameInput.reportValidity();
    }

    taskNameInput.addEventListener("keyup", checkTaskName);

    select.addEventListener("change", checkTaskName);
}