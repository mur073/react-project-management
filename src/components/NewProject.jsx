import { useRef, useContext } from 'react';

import { ProjectsContext } from '../store/projects-context';

import Input from './Input';
import Modal from './Modal';

const NewProject = () => {
  const { onAddProject, onCancel } = useContext(ProjectsContext);

  const titleInputRef = useRef(null);
  const descInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const modalRef = useRef(null);

  const handleSave = () => {
    const enteredTitle = titleInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    if (enteredTitle.trim === '' || enteredDesc.trim() === '' || enteredDate.trim() === '') {
      modalRef.current.open();
      return;
    }

    onAddProject({
      title: enteredTitle,
      desc: enteredDesc,
      date: enteredDate,
    });
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Okay">
        <h2 className="mb-4 text-stone-700 text-xl font-bold">Invalid input</h2>
        <p className="mb-8 text-stone-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, suscipit! Quis,
          fuga?
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md text-stone-800 hover:text-stone-950 hover:bg-stone-200"
            >
              Cancel
            </button>
          </li>

          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>

        <div>
          <Input label="Title" type="text" ref={titleInputRef} />
          <Input label="Description" textarea ref={descInputRef} />
          <Input label="Due Date" type="date" ref={dateInputRef} />
        </div>
      </div>
    </>
  );
};

export default NewProject;
