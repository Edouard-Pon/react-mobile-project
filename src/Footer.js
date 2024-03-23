import React, { useState } from 'react';
import Modal from './Modal';

function Footer({ onFilterInput, onAddTask }) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handleCloseModal = () => {
    setPopupVisible(false);
  };

  return (
    <div className="Footer">
      <footer className="Footer-footer">
        <input
          type="text"
          placeholder="Filter tasks..."
          onChange={event => onFilterInput(event.target.value)}
        />
        <button onClick={handleButtonClick}>New Task</button>
      </footer>
      <Modal
        isVisible={isPopupVisible}
        onAddTask={onAddTask}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Footer;
