import { toDoList } from "./globalToDoList";

export let currentCategory;

export default function renderTaskView(category, projectName = undefined) {
    renderTaskViewHeadline(category);

    let tasks;

    if (category === "tasks-all") {
        tasks = getAllTasks();
    } else if (category === "tasks-today") {
        tasks = getTodayTasks();
    } else if (category === "tasks-upcoming") {
        tasks = getUpcomingTasks();
    } else if (category === "tasks-completed") {
        tasks = getCompletedTasks();
    } else if (category === "project") {
        tasks = getProjectTasks(projectName);
        renderProjectViewInfo(projectName);
    }

    currentCategory = category;
    renderTasks(tasks);
}

function renderTaskViewHeadline(category) {
    const contentHeadline = document.querySelector("#content-headline");
    contentHeadline.classList.remove("project");

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

function renderProjectViewInfo(projectName) {
    // find project
    let projectList = toDoList.retrieveFromLocalStorage();

    let project = projectList.find(project => project.name === projectName)

    // render headline
    const contentHeadline = document.querySelector("#content-headline");
    contentHeadline.classList.add("project");
    contentHeadline.textContent = project.name;

    // render description
    let projectInfoContainer = document.querySelector("#project-info");
    if (projectInfoContainer) {
        projectInfoContainer.innerHTML = "";
    } else {
        projectInfoContainer = document.createElement("div");
        projectInfoContainer.id = ("project-info");
        contentHeadline.insertAdjacentElement("afterend", projectInfoContainer);
    }

    const dueDateInfo = document.createElement("p");
    dueDateInfo.id = "project-due-date-task-view";
    dueDateInfo.textContent = `Due date: ${project.dueDate}`;
    projectInfoContainer.appendChild(dueDateInfo);

    const newParagraph = document.createElement("p");
    newParagraph.id = "project-description-tasks";
    newParagraph.textContent = project.description;
    projectInfoContainer.appendChild(newParagraph);

    // deleteProject
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project-btn");
    deleteButton.textContent = "Delete Project";
    projectInfoContainer.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        toDoList.deleteProject(projectName);
        window.location.reload(true);
    })


    // edit Project
    const editButton = document.createElement("button");
    editButton.classList.add("edit-project-btn");
    editButton.textContent = "Edit Project"
    projectInfoContainer.appendChild(editButton);
    editButton.dataset.projectname = project.name;
    editButton.addEventListener("click", () => {
        editProject(project.name);
    })


    // add task
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-task-project-btn");
    addTaskButton.textContent = "Add New Task";
    projectInfoContainer.appendChild(addTaskButton);
    addTaskButton.addEventListener("click", () => {
        const dialogTask = document.querySelector("#dialog-add-task");
        let nameTask = document.querySelector("#name-task");
        let descriptionTask = document.querySelector("#description-task");
        let dueDateTask = document.querySelector("#due-date-task");
        let selectField = document.querySelector("#assign-to-project");
        let option = document.createElement("option");
        selectField.innerHTML = "";
        nameTask.value = "";
        descriptionTask.value = "";
        dueDateTask.value = "";
        dueDateTask.setAttribute("max", `${project.dueDate}`);
        option.value = projectName;
        option.textContent = projectName;
        selectField.appendChild(option);
        
        dialogTask.showModal();
    })
}


function getAllTasks() {
    let projectList = toDoList.retrieveFromLocalStorage();

    projectList.forEach(project => {
       project.tasks = project.tasks.filter(task => !task.completed);
    });

    projectList = projectList.filter(project => project.tasks.length > 0);

    return projectList;
}

function getTodayTasks() {
    let projectList = getAllTasks();

    let dateToday = new Date();
    let day = ('0' + dateToday.getDate()).slice(-2);
    let month = ('0' + dateToday.getMonth() + 1).slice(-2);
    let year = dateToday.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    projectList.forEach(project => {
       project.tasks = project.tasks.filter(task => task.dueDate === currentDate);
    });

    projectList = projectList.filter(project => project.tasks.length > 0);

    return projectList;
}

function getUpcomingTasks() {
    let projectList = getAllTasks();

    let dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 7);
    let day = ('0' + dateToday.getDate()).slice(-2);
    let month = ('0' + dateToday.getMonth() + 1).slice(-2);
    let year = dateToday.getFullYear();

    let dateOneWeek = `${year}-${month}-${day}`;

    projectList.forEach(project => {
       project.tasks = project.tasks.filter(task => task.dueDate < dateOneWeek);
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

function getProjectTasks(projectName) {
    let projectList = getAllTasks();

    projectList = projectList.filter(project => project.name === projectName);

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

            
            if (currentCategory != "project") {
                let projectHeader = document.createElement("h2");
                projectHeader.textContent = project.name;
                // add eventlistener on click to load projectview
                projectHeader.addEventListener("click", () => {
                    renderTaskView("project", project.name);
                });

                projectContainer.appendChild(projectHeader);

                // clear project specific content
                let projectInfoContainer = document.querySelector("#project-info");
                if (projectInfoContainer) {
                    projectInfoContainer.innerHTML = "";
                }
            }

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

                    setTimeout(() => {
                        renderTaskView(currentCategory, project.name);
                    }, 200);
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

                    renderTaskView(currentCategory, projectName);
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

        renderTaskView(currentCategory, projectName);

    });

    // delete button
    deleteTaskBtn.addEventListener("click", () => {
        let projectName = editButton.dataset.projectname;
        let taskName = editButton.dataset.taskname;

        toDoList.deleteTask(projectName, taskName);

        renderTaskView(currentCategory, projectName);
    });
}

function editProject(projectName) {
    const editTaskForm = document.querySelector("#dialog-edit-project");
    const inputName = document.querySelector("#name-edit-project");
    const inputDescription = document.querySelector("#description-edit-project");
    const inputDueDate = document.querySelector("#due-date-edit-project");
    const cancelBtn = document.querySelector("#cancel-edit-project-form");
    const saveChangesBtn = document.querySelector("#save-edit-project-btn");
    let project = toDoList.retrieveFromLocalStorage();
    project = project.find(project => project.name = projectName);

    editTaskForm.showModal();

    inputName.value = project.name;
    inputDescription.value = project.description;
    inputDueDate.value = project.dueDate;

    cancelBtn.addEventListener("click", () => {
        editTaskForm.close();
    })

    saveChangesBtn.addEventListener("click", () => {
        // send new values
        let newName = inputName.value;
        let newDescription = inputDescription.value;
        let newDueDate = inputDueDate.value;

        toDoList.editProject(projectName, newName, newDescription, newDueDate);

        renderTaskView(currentCategory, projectName);

    });
}