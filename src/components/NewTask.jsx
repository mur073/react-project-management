import { useState } from 'react';

const NewTask = ({ onAddTask }) => {
  const [enteredTask, setEnteredTask] = useState('');

  const handleChange = (e) => {
    setEnteredTask(e.target.value);
  };

  const handleClick = () => {
    onAddTask(enteredTask);
    setEnteredTask('');
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={enteredTask}
        onChange={handleChange}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button onClick={handleClick} className="text-stone-600 hover:text-stone-950">
        Add task
      </button>
    </div>
  );
};

export default NewTask;
