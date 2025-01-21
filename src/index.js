import "./styles.css";
import setupButtonListeners from "./buttonListeners";
import showProjectsSidebar from "./projectList";
import { setupButtonListenersTaskViewSidebar } from "./buttonListeners";
import { checkProjectNameExists, checkTaskNameInsideProjectExists } from "./nameCheck";


document.addEventListener("DOMContentLoaded", () => {
    setupButtonListeners();
    showProjectsSidebar();
    setupButtonListenersTaskViewSidebar();
    checkProjectNameExists();
    checkTaskNameInsideProjectExists();
});



