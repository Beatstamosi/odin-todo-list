import { toDoList } from "./globalToDoList";

export default function assignProjectOptionsToTaskForm() {
    const selectField = document.querySelector("#assign-to-project");

    // get todolist
    let list = toDoList.retrieveFromLocalStorage();
    console.log(list);

    selectField.innerHTML = "";

    // for each project add option field to selectField
    list.forEach((project, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;

        selectField.appendChild(option);
    });
}