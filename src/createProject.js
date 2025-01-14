export default function createProject() {
    let name = document.querySelector("#name-project").value;
    let description = document.querySelector("#description-project").value;
    let dueDate = document.querySelector("#due-date-project").value;

    return { name, description, dueDate, tasks: [] }
}