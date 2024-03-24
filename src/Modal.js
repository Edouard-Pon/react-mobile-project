import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ModalComponent({ isVisible, handleTaskEvent, onClose, initialTaskName, initialLimitDate, initialCategory }) {
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

  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Task
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalComponent;
