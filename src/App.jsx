import { useState } from 'react';

import { Sidebar, NewProject, NoProjectsSelected, SelectedProject } from './components/';

const App = () => {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartAddProject = () => {
    if (projectsState.selectedProjectId === null) return;

    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      selectedProjectId: null,
    }));
  };

  const handleCancelAddProject = () => {
    if (projectsState.selectedProjectId === undefined) return;

    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      selectedProjectId: undefined,
    }));
  };

  const handleAddProject = (projectData) => {
    setProjectsState((prevProjectsState) => {
      const newProjectId = Math.random();
      const newProject = {
        ...projectData,
        id: newProjectId,
      };

      return {
        ...prevProjectsState,
        selectedProjectId: newProjectId,
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  };

  const handleProjectSelect = (id) => {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      selectedProjectId: id,
    }));
  };

  const handleDeleteProject = () => {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: prevProjectsState.projects.filter(
          (project) => project.id !== prevProjectsState.selectedProjectId
        ),
      };
    });
  };

  const handleAddTask = (text) => {
    if (text.trim() === '') return;

    setProjectsState((prevProjectsState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevProjectsState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask],
      };
    });
  };
  const handleDeleteTask = (id) => {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: prevProjectsState.tasks.filter((task) => task.id !== id),
      };
    });
  };

  return (
    <main className="flex h-screen my-8 gap-8">
      <Sidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleProjectSelect}
        projectsState={projectsState}
        selectedProjectId={projectsState.selectedProjectId}
      />

      {projectsState.selectedProjectId === undefined && (
        <NoProjectsSelected onStartAddProject={handleStartAddProject} />
      )}

      {projectsState.selectedProjectId === null && (
        <NewProject
          onStartAddProject={handleStartAddProject}
          onAddProject={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      )}

      {projectsState.selectedProjectId && (
        <SelectedProject
          tasks={projectsState.tasks}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onDeleteProject={handleDeleteProject}
          project={projectsState.projects.find(
            (project) => project.id === projectsState.selectedProjectId
          )}
        />
      )}
    </main>
  );
};

export default App;
