import createProject from "./createProject";

export default function setupButtonListeners() {
    // pop up form to add task
    const dialogTask = document.querySelector("#dialog-add-task");
    const addTaskButton = document.querySelector("#add-new-task");
    const closeTaskFormButton = document.querySelector("#cancel-task-form");

    addTaskButton.addEventListener("click", () => {
        dialogTask.showModal();
    });

    closeTaskFormButton.addEventListener("click", () => {
        dialogTask.close();
    })

        // TODO: Add Task Button Functionality


    // pop up form to add project
    const dialogProject = document.querySelector("#dialog-add-project");
    const addProjectButton = document.querySelector("#add-new-project");
    const closeProjectFormButton = document.querySelector("#cancel-project-form");

    addProjectButton.addEventListener("click", () => {
        dialogProject.showModal();
    });


    closeProjectFormButton.addEventListener("click", () => {
        dialogProject.close();
    })


    // TODO: Add Project Button functionality
    const submitProjectBtn = document.querySelector("#add-project");

    
}
