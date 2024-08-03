import { createContext } from 'react';

export const ProjectsContext = createContext({
  projectsState: {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  },
  onStartAddProject: () => {},
  onSelectProject: () => {},
  onAddProject: () => {},
  onCancel: () => {},
  onDeleteProject: () => {},
  onAddTask: () => {},
  onDeleteTask: () => {},
});
