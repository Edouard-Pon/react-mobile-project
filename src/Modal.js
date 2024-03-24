import React, { useState, useEffect } from 'react';

function Modal({ isVisible, handleTaskEvent, onClose, initialTaskName, initialLimitDate }) {
  const [taskName, setTaskName] = useState(initialTaskName);
  const [limitDate, setLimitDate] = useState(initialLimitDate);

  useEffect(() => {
    setTaskName(initialTaskName);
    setLimitDate(initialLimitDate);
  }, [initialTaskName, initialLimitDate]);

  const handleTask = () => {
    handleTaskEvent(taskName, limitDate);
    setTaskName('');
    setLimitDate('');
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
      <input
        type="date"
        value={limitDate}
        onChange={event => setLimitDate(event.target.value)}
      />
      <button onClick={handleTask}>{initialTaskName === '' ? 'Add Task' : 'Update Task'}</button>
    </div>
  );
}

export default Modal;