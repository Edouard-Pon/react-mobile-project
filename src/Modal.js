import React, { useState, useEffect } from 'react';

function Modal({ isVisible, handleTaskEvent, onClose, initialTaskName }) {
  const [taskName, setTaskName] = useState(initialTaskName);

  useEffect(() => {
    setTaskName(initialTaskName);
  }, [initialTaskName]);

  const handleTask = () => {
    handleTaskEvent(taskName);
    setTaskName('');
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="Modal">
      <input
        type="text"
        placeholder="Task name..."
        value={taskName}
        onChange={event => setTaskName(event.target.value)}
      />
      <button onClick={handleTask}>{initialTaskName === '' ? 'Add Task' : 'Update Task'}</button>
    </div>
  );
}

export default Modal;
