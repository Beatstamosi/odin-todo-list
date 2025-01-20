import "./styles.css";
import setupButtonListeners from "./buttonListeners";
import showProjectsSidebar from "./projectList";
import { setupButtonListenersTaskViewSidebar } from "./buttonListeners";


document.addEventListener("DOMContentLoaded", () => {
    setupButtonListeners();
    showProjectsSidebar();
    setupButtonListenersTaskViewSidebar();
});



