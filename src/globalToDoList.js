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

        // TO DO check if project name already exists
    };


    const deleteProject = function(projectName) {
        let projectIndex = getProjectIndex(projectName);
        allProjects.splice(projectIndex, 1);
        saveToLocalStorage();
    };


    const addTaskToProject = function(nameTask, descriptionTask, dueDateTask, priority, projectName) {
        let newTask = new Task(nameTask, descriptionTask, dueDateTask, priority);
        let projectIndex = getProjectIndex(projectName);
        allProjects[projectIndex].tasks.push(newTask);
        saveToLocalStorage();

        // TO DO check if task name already exists inside this project; show error and dont save
    };

    const toggleTaskComplete = function(checked, projectName, taskName) {
        let projectIndex = getProjectIndex(projectName);
        let taskIndex = getTaskIndex(projectIndex, taskName);
        let task = allProjects[projectIndex].tasks[taskIndex];

        task.completed = checked;

        saveToLocalStorage();
    }


    const deleteTask = function(projectName, taskName) {
        let projectIndex = getProjectIndex(projectName);
        let taskIndex = getTaskIndex(projectIndex, taskName);

        allProjects[projectIndex].tasks.splice(taskIndex, 1);
        saveToLocalStorage();
    }


    const editTask = function(projectName, taskName, newName, newDescription, newDueDate, newPriority) {
        let projectIndex = getProjectIndex(projectName);
        let taskIndex = getTaskIndex(projectIndex, taskName);

        let task = allProjects[projectIndex].tasks[taskIndex];
        task.name = newName;
        task.description = newDescription;
        task.dueDate = newDueDate;
        task.priority = newPriority;

        saveToLocalStorage();
    }


    function getProjectIndex(projectName) {
        const checkForName = (element) => element.name === projectName;
        let projectIndex = allProjects.findIndex(checkForName);

        return projectIndex;
    }

    function getTaskIndex(projectIndex, taskname) {
        const checkForName = (element) => element.name === taskname;
        let taskIndex = allProjects[projectIndex].tasks.findIndex(checkForName);

        return taskIndex;
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
                    return new Task(taskData.name, taskData.description, taskData.dueDate, taskData.priority, taskData.completed);
                });
                return project;
            });
        }
        return [];
    }

    return {
        addProject,
        deleteProject,
        editTask,
        addTaskToProject,
        toggleTaskComplete,
        deleteTask,
        getProjectIndex,
        saveToLocalStorage,
        retrieveFromLocalStorage
    }
}();



// TODO
// new .js to initialize globalList
    // retrieve localStorage
        // if empty: 
            // create General Project
            // add general project to globalList
            // add Example Task