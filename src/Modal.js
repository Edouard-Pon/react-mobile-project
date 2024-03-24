import React, { useState, useEffect } from 'react';

function Modal({ isVisible, handleTaskEvent, onClose, initialTaskName, initialLimitDate, initialCategory }) {
  const [taskName, setTaskName] = useState(initialTaskName);
  const [limitDate, setLimitDate] = useState(initialLimitDate);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setTaskName(initialTaskName);
    setLimitDate(initialLimitDate);
    setCategory(initialCategory);
  }, [initialTaskName, initialLimitDate, initialCategory]);

  const handleTask = () => {
    handleTaskEvent(taskName, limitDate, category);
    setTaskName('');
    setLimitDate('');
    setCategory('');
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
      <select value={category} onChange={event => setCategory(event.target.value)}>
        <option disabled={true} value="">Category</option>
        <option value="priority">Priority</option>
        <option value="important">Important</option>
        <option value="email">Email</option>
      </select>
      <button onClick={handleTask}>{initialTaskName === '' ? 'Add Task' : 'Update Task'}</button>
    </div>
  );
}

export default Modal;