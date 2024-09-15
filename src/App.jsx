import { useState } from 'react';

import NewProject from './Components/NewProject.jsx';
import NoProjectSelected from './Components/NoProjectSelected.jsx';
import ProjectsSidebar from './Components/ProjectsSidebar.jsx'; 
import SelectedProject from './Components/SelectProject.jsx';
import NewTasks from './Components/NewTasks.jsx';

  function App() {
    const [projectsState, setprojectsState] = useState({
      selectedProjectId: undefined,
      projects: [],
      tasks: []
    });

  function handleAddTask(text) {
    setprojectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId:prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }
  
  function handleDeleteTask(id) {
    setprojectsState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setprojectsState(preState => {
      return{
        ...preState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setprojectsState(preState => {
      return{
        ...preState,
        selectedProjectId: null,
      };
    });
  } 

  function handleCancelAddProject() {
    setprojectsState(preState => {
      return{
        ...preState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projrctData) {
    setprojectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projrctData,
        id:projectId,
      };

      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject () {
    setprojectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }
  
  const selectedProject = projectsState.projects.find(
    project => project.id === projectsState.selectedProjectId
  );

  let content = (
  <SelectedProject 
    project={selectedProject} 
    onDelete={handleDeleteProject} 
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject  onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  } else if (projectsState.selectedProjectId ===undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
