import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


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
      className="modal"
    >
      <Box className="modal-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <span className="modal-title">{initialTaskName === '' ? 'Add Task' : 'Edit Task'}</span>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="modal-description">
          <input
            type="text"
            placeholder="Task name..."
            value={taskName}
            onChange={event => setTaskName(event.target.value)}
            className="modal-input"
          />
          <input
            type="date"
            value={limitDate}
            onChange={event => setLimitDate(event.target.value)}
            className="modal-input"
          />
          <select value={category} onChange={event => setCategory(event.target.value)} className="modal-select">
            <option disabled={true} value="">Category</option>
            <option value="priority">Priority</option>
            <option value="important">Important</option>
            <option value="email">Email</option>
          </select>
          <button onClick={handleTask} className="modal-button btn-primary center">{initialTaskName === '' ? <AddIcon/> : <EditIcon/>}</button>
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalComponent;
