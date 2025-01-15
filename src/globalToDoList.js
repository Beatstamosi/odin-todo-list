import createProject from "./createProject";

 export const toDoList = function() {

    let existingToDoList = retrieveFromLocalStorage();
    const allProjects = existingToDoList ? existingToDoList : [];

    const addProject = function() {
        allProjects.push(createProject());

        saveToLocalStorage();

        // TODO run screenController for Project list in sidebar

    };

    // TODO Check if function takes other parameter than projectName
    const deleteProject = function(projectName) {
        let index = allProjects.indexOf(projectName);
        allProjects.splice(index, 1);
        saveToLocalStorage();
    }
    
    function saveToLocalStorage()  {
        localStorage.setItem("toDoList", JSON.stringify(allProjects));
    };


    function retrieveFromLocalStorage() {
        return JSON.parse(localStorage.getItem("toDoList"));
    }

    return {
        addProject,
        deleteProject,
        saveToLocalStorage,
        retrieveFromLocalStorage
    }
}();




// new .js to initialize globalList
    // create General Project
    // add general project to globalList
    // add Example Task


// screenController update projects sidebar
    // retrieve globallist
    // update project list in sidebar




