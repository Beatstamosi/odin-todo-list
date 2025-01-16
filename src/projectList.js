import { toDoList } from "./globalToDoList";
import imgSrc from "./img/project-icon.svg";

export default function showProjectsSidebar() {
    const projectsSidebar = document.querySelector("#project-list-sidebar-container");
    projectsSidebar.innerHTML = "";

    let allProjects = toDoList.retrieveFromLocalStorage();

    allProjects.forEach((project, index) => {
        let container = document.createElement("div");
        container.classList.add("container-project-category");
        projectsSidebar.appendChild(container);

        let img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("icon-tasks");

        let text = document.createElement("span");
        text.textContent = project.name;

        container.append(img, text);
        container.dataset.index = index;
    })    
}

