import { toDoList } from "./globalToDoList";

export default function renderTaskView(category) {
    renderTaskViewHeadline(category);

    let tasks;
    // depending on category call function to get tasks
    if (category === "tasks-all") {
        tasks = getAllTasks();
        renderAllTasks(tasks);
    } else if (category === "tasks-today") {
        
        
    } else if (category === "tasks-upcoming") {
        
        
    } else if (category === "tasks-completed") {
        
        
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
    return toDoList.retrieveFromLocalStorage();
}

function renderAllTasks(projectsList) {
    const containerContent = document.querySelector("#container-content-overview");
    containerContent.innerHTML = "";
    
    projectsList.forEach(project => {
        // render headline for project
        if (project.tasks.length > 0) {
            let projectContainer = document.createElement("div");
            projectContainer.classList.add("project-tasks-component");
            containerContent.appendChild(projectContainer);

            let projectHeader = document.createElement("h2");
            projectHeader.textContent = project.name;
            projectContainer.appendChild(projectHeader);

            project.tasks.forEach((task, index) => {
                // render card for tasks - priority, checkbox, title, duedate - button edit, button drop down
                // add div with extended content for description
    
                let containerTask = document.createElement("div");
                containerTask.classList.add("task-component");
                projectContainer.appendChild(containerTask);
    
                let priorityTag = document.createElement("div");
                priorityTag.classList.add("priority-tag");
                priorityTag.classList.add(task.priority);

                let inputCheckbox = document.createElement("input");
                inputCheckbox.type = "checkbox";
                inputCheckbox.classList.add("task-complete");
                inputCheckbox.id = `task-complete-${index}`;
                inputCheckbox.dataset.taskIndex = index;
                inputCheckbox.dataset.projectname = project.name;
                // TO DO add event listeners
    
                let title = document.createElement("p");
                title.classList.add("title-task-overview")
                title.textContent = task.name;
    
                let dueDate = document.createElement("p");
                dueDate.classList.add("due-date-task-overview");
                dueDate.textContent = task.dueDate;
    
                let editButton = document.createElement("button");
                editButton.classList.add("edit-task-btn");
                // TO DO add eventlisteners
    
                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-task-btn");
                deleteButton.dataset.taskIndex = index;
                deleteButton.dataset.projectname = project.name;
                // TO DO add eventlisteners
                
                let extendButton = document.createElement("button");
                extendButton.classList.add("extend-task");
                // TO DO add eventlistener + add to description div
    
                // let containerDescription = document.createElement("div");
                // containerDescription.classList.add("expanded-task-content");
                // // TO DO add classes to show / hide element - toggle via labelExtend
    
                // // let description = document.createElement("p");
                // // description.textContent = task.description;
                // // containerDescription.appendChild(description);
    
                containerTask.append(priorityTag, inputCheckbox, title, dueDate, editButton, deleteButton, extendButton);
    
                // add index of task and project name as dataset
            })
        }
        
        // add margin-bottom via css to project-task container
    })
}

    