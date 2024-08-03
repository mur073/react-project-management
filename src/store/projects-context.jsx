import { useReducer, createContext } from 'react';

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

const projectsReducer = (state, action) => {
  if (action.type === 'START_ADD_PROJECT') {
    return {
      ...state,
      selectedProjectId: null,
    };
  }

  if (action.type === 'CANCEL_ADD_PROJECT') {
    return {
      ...state,
      selectedProjectId: undefined,
    };
  }

  if (action.type === 'ADD_PROJECT') {
    const newProjectId = Math.random();
    const newProject = {
      ...action.payload,
      id: newProjectId,
    };

    return {
      ...state,
      selectedProjectId: newProjectId,
      projects: [...state.projects, newProject],
    };
  }

  if (action.type === 'SELECT_PROJECT') {
    return {
      ...state,
      selectedProjectId: action.payload,
    };
  }

  if (action.type === 'DELETE_PROJECT') {
    return {
      ...state,
      selectedProjectId: undefined,
      projects: state.projects.filter((project) => project.id !== state.selectedProjectId),
    };
  }

  if (action.type === 'ADD_TASK') {
    const taskId = Math.random();
    const newTask = {
      text: action.payload,
      projectId: state.selectedProjectId,
      id: taskId,
    };

    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  }

  if (action.type === 'DELETE_TASK') {
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    };
  }
};

const ProjectsContextProvider = ({ children }) => {
  const [projectsState, projectsStateDispatch] = useReducer(projectsReducer, {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartAddProject = () => {
    if (projectsState.selectedProjectId === null) return;

    projectsStateDispatch({
      type: 'START_ADD_PROJECT',
    });
  };

  const handleCancelAddProject = () => {
    if (projectsState.selectedProjectId === undefined) return;

    projectsStateDispatch({
      type: 'CANCEL_ADD_PROJECT',
    });
  };

  const handleAddProject = (projectData) => {
    projectsStateDispatch({
      type: 'ADD_PROJECT',
      payload: projectData,
    });
  };

  const handleProjectSelect = (id) => {
    projectsStateDispatch({
      type: 'SELECT_PROJECT',
      payload: id,
    });
  };

  const handleDeleteProject = () => {
    projectsStateDispatch({
      type: 'DELETE_PROJECT',
    });
  };

  const handleAddTask = (text) => {
    if (text.trim() === '') return;

    projectsStateDispatch({
      type: 'ADD_TASK',
      payload: text,
    });
  };

  const handleDeleteTask = (id) => {
    projectsStateDispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  };

  return (
    <ProjectsContext.Provider
      value={{
        ...projectsState,
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
