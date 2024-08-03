import { useContext } from 'react';
import { ProjectsContext } from '../store/projects-context';

import Button from './Button';

const Sidebar = () => {
  const { onStartAddProject, onSelectProject, selectedProjectId, projects } =
    useContext(ProjectsContext);

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          const classes = `w-full text-left px-2 py-1 my-1 rounded-sm  hover:bg-stone-800 ${
            project.id === selectedProjectId ? 'bg-stone-800 text-stone-200' : 'text-stone-400'
          }`;

          return (
            <li key={project.id}>
              <button
                onClick={() => {
                  onSelectProject(project.id);
                }}
                className={classes}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
