import { toDoList } from "./globalToDoList";

export default function initializeList() {
    let currentList = toDoList.retrieveFromLocalStorage();

    if (currentList.length === 0) {
        const name = "General Work";
        const description = "This is a placeholder project for all your general tasks";

        let dateToday = new Date();
        dateToday.setDate(dateToday.getDate() + 14);
        let day = ('0' + dateToday.getDate()).slice(-2);
        let month = ('0' + dateToday.getMonth() + 1).slice(-2);
        let year = dateToday.getFullYear();

        let dueDate = `${year}-${month}-${day}`;

        toDoList.addProject(name, description, dueDate);

        initializeFirstTask(name);
    }
}

function initializeFirstTask(projectName) {
    let nameTask = "Get General Work done";
    let descriptionTask = "This is just a placeholder task to show you the functionality";
    let dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 14);
    let day = ('0' + dateToday.getDate()).slice(-2);
    let month = ('0' + dateToday.getMonth() + 1).slice(-2);
    let year = dateToday.getFullYear();

    let dueDateTask = `${year}-${month}-${day}`;


    let priority = "low";

    toDoList.addTaskToProject(nameTask, descriptionTask, dueDateTask, priority, projectName);
}