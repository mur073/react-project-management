import { useContext } from 'react';
import { ProjectsContext } from './store/projects-context';

import { Sidebar, NewProject, NoProjectsSelected, SelectedProject } from './components/';

const App = () => {
  const { selectedProjectId } = useContext(ProjectsContext);

  return (
    <main className="flex h-screen my-8 gap-8">
      <Sidebar />

      {selectedProjectId === undefined && <NoProjectsSelected />}

      {selectedProjectId === null && <NewProject />}

      {selectedProjectId && <SelectedProject />}
    </main>
  );
};

export default App;
