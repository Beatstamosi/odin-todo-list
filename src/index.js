import "./styles.css";
import setupButtonListeners from "./buttonListenersForm";
import { toDoList } from "./globalToDoList";
import showProjectsSidebar from "./projectList";
import renderTaskView from "./renderTaskView";


document.addEventListener("DOMContentLoaded", () => {
    setupButtonListeners();
    showProjectsSidebar();
    console.log(toDoList.retrieveFromLocalStorage());

    const allTaskButton = document.querySelector("#tasks-all");
    allTaskButton.addEventListener("click", () => {
        renderTaskView(allTaskButton.id);
    })

    const completedTaskButton = document.querySelector("#tasks-completed");
    completedTaskButton.addEventListener("click", () => {
        renderTaskView(completedTaskButton.id);
    })

    const todayTaskButton = document.querySelector("#tasks-today");
    todayTaskButton.addEventListener("click", () => {
        renderTaskView(todayTaskButton.id);
    })

    const upcomingTaskButton = document.querySelector("#tasks-upcoming");
   upcomingTaskButton.addEventListener("click", () => {
        renderTaskView(upcomingTaskButton.id);
    })

    const projectsSidebar = Array.from(document.querySelectorAll(".container-project-category"));
    projectsSidebar.forEach(project => {
        project.addEventListener("click", () => {
            let category = project.dataset.category;
            let projectName = project.dataset.projectname;
            renderTaskView(category, projectName);
        })
    })
});



