import noproject from '../assets/no-projects.png';

import Button from './Button';

const NoProjectsSelected = ({ onStartAddProject }) => (
  <div className="w-[35rem] mt-24 flex flex-col items-center">
    <div>
      <img src={noproject} alt="no project selected image" className="w-24 h-24" />
    </div>

    <div className="mt-4 text-center">
      <h2 className="mb-4 text-stone-800 text-xl font-bold">No Project Selected</h2>
      <p className="mb-8 text-stone-400">Select a project a create a new one</p>

      <Button onClick={onStartAddProject}>Create new project</Button>
    </div>
  </div>
);

export default NoProjectsSelected;
