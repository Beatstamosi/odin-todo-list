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

});



