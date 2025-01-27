import { toDoList } from "./globalToDoList";
import assignProjectOptionsToTaskForm from "./projectOptions";
import renderTaskView from "./renderTaskView";
import { currentCategory } from "./renderTaskView";
import showProjectsSidebar from "./projectList";

export default function setupButtonListenersForms() {
  // pop up form to add task
  const dialogTask = document.querySelector("#dialog-add-task");
  const addTaskButton = document.querySelector("#add-new-task");
  const closeTaskFormButton = document.querySelector("#cancel-task-form");
  let nameTask = document.querySelector("#name-task");
  let descriptionTask = document.querySelector("#description-task");
  let dueDateTask = document.querySelector("#due-date-task");

  addTaskButton.addEventListener("click", () => {
    assignProjectOptionsToTaskForm();
    nameTask.value = "";
    descriptionTask.value = "";
    dueDateTask.value = "";
    dialogTask.showModal();
  });

  closeTaskFormButton.addEventListener("click", () => {
    dialogTask.close();
  });

  // Add Task Button Functionality
  const submitTaskButton = document.querySelector("#add-task");
  submitTaskButton.addEventListener("click", () => {
    let select = document.querySelector("#assign-to-project");
    let projectName = select.options[select.selectedIndex].value;
    let prioritySelect = document.querySelector("#priority-task");
    let priority = prioritySelect.options[prioritySelect.selectedIndex].value;

    toDoList.addTaskToProject(
      nameTask.value,
      descriptionTask.value,
      dueDateTask.value,
      priority,
      projectName,
    );

    renderTaskView(currentCategory, projectName);
  });

  // pop up form to add project
  const dialogProject = document.querySelector("#dialog-add-project");
  const addProjectButton = document.querySelector("#add-new-project");
  const closeProjectFormButton = document.querySelector("#cancel-project-form");
  let name = document.querySelector("#name-project");
  let description = document.querySelector("#description-project");
  let dueDate = document.querySelector("#due-date-project");

  addProjectButton.addEventListener("click", () => {
    name.value = "";
    description.value = "";
    dueDate.value = "";
    dialogProject.showModal();
  });

  closeProjectFormButton.addEventListener("click", () => {
    dialogProject.close();
  });

  // Add Project Button functionality
  const submitProjectBtn = document.querySelector("#add-project");

  submitProjectBtn.addEventListener("click", () => {
    toDoList.addProject(name.value, description.value, dueDate.value);
    showProjectsSidebar();
    setupButtonListenersTaskViewSidebar();
  });
}

export function setupButtonListenersTaskViewSidebar() {
  const allTaskButton = document.querySelector("#tasks-all");
  allTaskButton.addEventListener("click", () => {
    renderTaskView(allTaskButton.id);
  });

  const completedTaskButton = document.querySelector("#tasks-completed");
  completedTaskButton.addEventListener("click", () => {
    renderTaskView(completedTaskButton.id);
  });

  const todayTaskButton = document.querySelector("#tasks-today");
  todayTaskButton.addEventListener("click", () => {
    renderTaskView(todayTaskButton.id);
  });

  const upcomingTaskButton = document.querySelector("#tasks-upcoming");
  upcomingTaskButton.addEventListener("click", () => {
    renderTaskView(upcomingTaskButton.id);
  });

  const projectsSidebar = Array.from(
    document.querySelectorAll(".container-project-category"),
  );
  projectsSidebar.forEach((project) => {
    project.addEventListener("click", () => {
      let category = project.dataset.category;
      let projectName = project.dataset.projectname;
      renderTaskView(category, projectName);
    });
  });
}
