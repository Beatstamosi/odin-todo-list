export default function createProject() {
    let name = document.querySelector("#name-project").value;
    let description = document.querySelector("#description-project").value;
    let dueDate = document.querySelector("#due-date-project").value;

    // function to add tasks --> call createTasks and add to array
    // function to delete tasks

    return { name, description, dueDate, tasks: [] }
}