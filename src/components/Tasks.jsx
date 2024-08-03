import NewTask from './NewTask';

import { useContext } from 'react';
import { ProjectsContext } from '../store/projects-context';

const Tasks = ({ tasks }) => {
  const { onDeleteTask } = useContext(ProjectsContext);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />

      {!tasks.length && <p className="text-stone-800 my-4">You haven't added any tasks yet.</p>}

      {tasks.length > 0 && (
        <ul className="flex flex-col gap-2 mt-8 rounded-md">
          {tasks.map((task) => {
            return (
              <li key={task.id} className="flex px-4 py-4 justify-between bg-stone-100">
                <span>{task.text}</span>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-stone-700 hover:text-red-500"
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
