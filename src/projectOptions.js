import { toDoList } from "./globalToDoList";

export default function assignProjectOptionsToTaskForm() {
  const selectField = document.querySelector("#assign-to-project");
  let initialProjectName;

  // get todolist
  let list = toDoList.retrieveFromLocalStorage();

  selectField.innerHTML = "";

  // for each project add option field to selectField
  list.forEach((project, index) => {
    let option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;

    // Set the first option to be selected by default
    if (index === 0) {
      option.selected = true;
      initialProjectName = project.name;
    }

    selectField.appendChild(option);
  });

  // Ensure max date is set based on the first project after options are added
  setMaxDateAttributeDependingOnProjectDueDate(
    selectField,
    list,
    initialProjectName,
  );
}

function setMaxDateAttributeDependingOnProjectDueDate(
  selectField,
  list,
  initialProjectName,
) {
  const dateInput = document.querySelector("#due-date-task");

  // Function to set max date based on the selected project's dueDate
  const setMaxDate = (projectName) => {
    const selectedProject = list.find(
      (project) => project.name === projectName,
    );
    if (selectedProject && selectedProject.dueDate) {
      dateInput.setAttribute("max", selectedProject.dueDate);
    } else {
      dateInput.removeAttribute("max");
    }
  };

  // Initialize max value with the selected option (e.g., the first option)
  setMaxDate(initialProjectName);

  // Add event listener for change in selected project
  selectField.addEventListener("change", function () {
    setMaxDate(selectField.value); // Reuse the setMaxDate function on change
  });
}
