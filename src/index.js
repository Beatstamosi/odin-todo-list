import "./styles.css";
import setupButtonListeners from "./buttonListenersForm";
import { toDoList } from "./globalToDoList";
import showProjectsSidebar from "./projectList";


document.addEventListener("DOMContentLoaded", () => {
    setupButtonListeners();
    showProjectsSidebar();
    console.log(toDoList.retrieveFromLocalStorage());
});



