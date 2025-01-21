import "./styles.css";
import setupButtonListeners from "./buttonListeners";
import showProjectsSidebar from "./projectList";
import { setupButtonListenersTaskViewSidebar } from "./buttonListeners";
import { checkProjectNameExists, checkTaskNameInsideProjectExists } from "./nameCheck";
import initializeList from "./initializeList";


document.addEventListener("DOMContentLoaded", () => {
    initializeList();
    setupButtonListeners();
    showProjectsSidebar();
    setupButtonListenersTaskViewSidebar();
    checkProjectNameExists();
    checkTaskNameInsideProjectExists();
});



