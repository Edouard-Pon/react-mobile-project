import React, { useState } from 'react';

function Modal({ isVisible, onAddTask, onClose }) {
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = () => {
    onAddTask(newTaskName);
    setNewTaskName('');
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
        value={newTaskName}
        onChange={event => setNewTaskName(event.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default Modal;
