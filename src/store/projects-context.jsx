import { useState, createContext } from 'react';

export const ProjectsContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  onStartAddProject: () => {},
  onSelectProject: () => {},
  onAddProject: () => {},
  onCancel: () => {},
  onDeleteProject: () => {},
  onAddTask: () => {},
  onDeleteTask: () => {},
});

const ProjectsContextProvider = ({ children }) => {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartAddProject = () => {
    if (projectsState.selectedProjectId === null) {
      return;
    }

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
    <ProjectsContext.Provider
      value={{
        selectedProjectId: projectsState.selectedProjectId,
        projects: projectsState.projects,
        tasks: projectsState.tasks,
        onSelectProject: handleProjectSelect,
        onStartAddProject: handleStartAddProject,
        onAddProject: handleAddProject,
        onCancel: handleCancelAddProject,
        onDeleteProject: handleDeleteProject,
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
