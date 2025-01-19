import { toDoList } from "./globalToDoList";

let currentCategory;

export default function renderTaskView(category) {
    renderTaskViewHeadline(category);

    let tasks;
    // depending on category call function to get tasks
    if (category === "tasks-all") {
        tasks = getAllTasks();
        currentCategory = category;
        renderTasks(tasks);
    } else if (category === "tasks-today") {
        
        
    } else if (category === "tasks-upcoming") {
        
        
    } else if (category === "tasks-completed") {
        tasks = getCompletedTasks();
        currentCategory = category;
        renderTasks(tasks);
    }

    // pass in tasks and call render function for tasks
}

function renderTaskViewHeadline(category) {
    const contentHeadline = document.querySelector("#content-headline");

    let headline;

    if (category === "tasks-all") {
        headline = "All Tasks";
    } else if (category === "tasks-today") {
        headline = "Today's Tasks";
    } else if (category === "tasks-upcoming") {
        headline = "Upcoming Tasks";
    } else if (category === "tasks-completed") {
        headline = "Completed Tasks";
    }

    contentHeadline.textContent = headline;
}

function getAllTasks() {
    let projectList = toDoList.retrieveFromLocalStorage();

    projectList.forEach(project => {
       project.tasks = project.tasks.filter(task => !task.completed);
    });

    projectList = projectList.filter(project => project.tasks.length > 0);

    return projectList;
}


function getCompletedTasks() {
    let projectList = toDoList.retrieveFromLocalStorage();

    projectList.forEach(project => {
       project.tasks = project.tasks.filter(task => task.completed);
    });

    projectList = projectList.filter(project => project.tasks.length > 0);

    return projectList;
}


function renderTasks(projectsList) {
    const containerContent = document.querySelector("#container-content-overview");
    containerContent.innerHTML = "";
    
    projectsList.forEach(project => {
        if (project.tasks.length > 0) {
            let projectContainer = document.createElement("div");
            projectContainer.classList.add("project-tasks-component");
            containerContent.appendChild(projectContainer);

            let projectHeader = document.createElement("h2");
            projectHeader.textContent = project.name;
            projectContainer.appendChild(projectHeader);

            project.tasks.forEach((task, index) => {
    
                let containerTask = document.createElement("div");
                containerTask.classList.add("task-component");
                containerTask.id = `task-${index}`;
                projectContainer.appendChild(containerTask);
    
                let priorityTag = document.createElement("div");
                priorityTag.classList.add("priority-tag");
                priorityTag.classList.add(task.priority);

                let inputCheckbox = document.createElement("input");
                inputCheckbox.type = "checkbox";
                inputCheckbox.classList.add("task-complete");
                inputCheckbox.id = `task-complete-${index}`;
                inputCheckbox.dataset.taskname = task.name;
                inputCheckbox.dataset.projectname = project.name;
                if (currentCategory === "tasks-completed") {
                    inputCheckbox.checked = true;
                }
                inputCheckbox.addEventListener("change", () => {
                    let checked = inputCheckbox.checked;
                    toDoList.toggleTaskComplete(checked, project.name, task.name);
                    renderTaskView(currentCategory);
                });
    
                let title = document.createElement("p");
                title.classList.add("title-task-overview")
                title.textContent = task.name;
    
                let dueDate = document.createElement("p");
                dueDate.classList.add("due-date-task-overview");
                dueDate.textContent = task.dueDate;
    
                let editButton = document.createElement("button");
                editButton.classList.add("edit-task-btn");
                editButton.dataset.taskname = task.name;
                editButton.dataset.projectname = project.name;
                editButton.addEventListener("click", function() {
                    addEditTaskEvent(editButton, task);
                })
    
                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-task-btn");
                deleteButton.dataset.taskname = task.name;
                deleteButton.dataset.projectname = project.name;
                deleteButton.addEventListener("click", () => {
                    let projectName = editButton.dataset.projectname;
                    let taskName = editButton.dataset.taskname;

                    toDoList.deleteTask(projectName, taskName);

                    renderTaskView(currentCategory);
                })
                
    
                let containerDescription = document.createElement("div");
                containerDescription.classList.add("expanded-task-content", "hide");
    
                let description = document.createElement("p");
                description.textContent = task.description;
                containerDescription.appendChild(description);

                let extendButton = document.createElement("button");
                extendButton.classList.add("extend-task");
                extendButton.addEventListener("click", () => {
                    containerDescription.classList.toggle("hide");
                })
    
                containerTask.append(priorityTag, inputCheckbox, title, dueDate, editButton, deleteButton, extendButton, containerDescription);
            })
        }
    })
}

function addEditTaskEvent(editButton, task) {
    const editTaskForm = document.querySelector("#dialog-edit-task");
    const inputName = document.querySelector("#name-edit-task");
    const inputDescription = document.querySelector("#description-edit-task");
    const inputDueDate = document.querySelector("#due-date-edit-task");
    const inputSelect = document.querySelector("#priority-edit-task");
    const cancelBtn = document.querySelector("#cancel-edit-task-form");
    const saveChangesBtn = document.querySelector("#save-edit-task-btn");
    const deleteTaskBtn = document.querySelector("#delete-task-form-btn");

    editTaskForm.showModal();

    inputName.value = task.name;
    inputDescription.value = task.description;
    inputDueDate.value = task.dueDate;
    inputSelect.value = task.priority;

    cancelBtn.addEventListener("click", () => {
        editTaskForm.close();
    })

    saveChangesBtn.addEventListener("click", () => {
        let projectName = editButton.dataset.projectname;
        let taskName = editButton.dataset.taskname;

        // send new values
        let newName = inputName.value;
        let newDescription = inputDescription.value;
        let newDueDate = inputDueDate.value;
        let newPriority = inputSelect.value;

        toDoList.editTask(projectName, taskName, newName, newDescription, newDueDate, newPriority);

        renderTaskView(currentCategory);

    });

    // delete button
    deleteTaskBtn.addEventListener("click", () => {
        let projectName = editButton.dataset.projectname;
        let taskName = editButton.dataset.taskname;

        toDoList.deleteTask(projectName, taskName);

        renderTaskView(currentCategory);
    });
}