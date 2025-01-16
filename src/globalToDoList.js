import { Project } from "./createProject";
import { Task } from "./createTask";
import showProjectsSidebar from "./projectList";

 export const toDoList = function() {

    let existingToDoList = retrieveFromLocalStorage();
    const allProjects = existingToDoList ? existingToDoList : [];

    const addProject = function(name, description, dueDate) {
        allProjects.push(new Project(name, description, dueDate));
        saveToLocalStorage();
        showProjectsSidebar();
    };

    
    // TODO Check if function takes other parameter than projectName
    const deleteProject = function(projectName) {
        let index = allProjects.indexOf(projectName);
        allProjects.splice(index, 1);
        saveToLocalStorage();
    };

    const addTaskToProject = function(nameTask, descriptionTask, dueDateTask, index) {
        let newTask = new Task(nameTask, descriptionTask, dueDateTask);
        allProjects[index].tasks.push(newTask);
        saveToLocalStorage();
    };


    const deleteTask = function(projectIndex, taskIndex) {
        allProjects[projectIndex].tasks[taskIndex].splice(index, 1);
        saveToLocalStorage();
    }
    

    function saveToLocalStorage()  {
        const projectsData = allProjects.map(project => ({
            name: project.name,
            description: project.description,
            dueDate: project.dueDate,
            tasks: project.tasks // Tasks will be plain objects, not instances of Task
        }));
        localStorage.setItem("toDoList", JSON.stringify(projectsData));
    };


    function retrieveFromLocalStorage() {
        let projects = JSON.parse(localStorage.getItem("toDoList"));
        if (projects) {
            // Convert each project back into an instance of the Project class
            return projects.map(projectData => {
                const project = new Project(projectData.name, projectData.description, projectData.dueDate);
                // Manually reassign the tasks, as they are just plain objects after serialization
                project.tasks = projectData.tasks.map(taskData => {
                    return new Task(taskData.name, taskData.description, taskData.dueDate);
                });
                return project;
            });
        }
        return [];
    }

    return {
        addProject,
        deleteProject,
        addTaskToProject,
        deleteTask,
        saveToLocalStorage,
        retrieveFromLocalStorage
    }
}();




// new .js to initialize globalList
    // retrieve localStorage
        // if empty: 
            // create General Project
            // add general project to globalList
            // add Example Task


// screenController update projects sidebar
    // retrieve globallist
    // update project list in sidebar


// render projects into options on task form


