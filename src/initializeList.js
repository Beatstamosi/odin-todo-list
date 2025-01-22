import { toDoList } from "./globalToDoList";
import getDate from "./getDate";

export default function initializeList() {
    let currentList = toDoList.retrieveFromLocalStorage();

    if (currentList.length === 0) {
        const name = "General Work";
        const description = "This is a placeholder project for all your general tasks";

        let dueDate = getDate(14);

        toDoList.addProject(name, description, dueDate);

        initializeFirstTask(name);
    }
}

function initializeFirstTask(projectName) {
    let nameTask = "Get General Work done";
    let descriptionTask = "This is just a placeholder task to show you the functionality";

    let dueDateTask = getDate(7);

    let priority = "low";

    toDoList.addTaskToProject(nameTask, descriptionTask, dueDateTask, priority, projectName);
}