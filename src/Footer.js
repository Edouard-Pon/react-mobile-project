import React from 'react';

function Footer({ onFilterInput, displayAddTask, saveToLocalStorage }) {
  return (
    <div className="Footer">
      <footer className="Footer-footer">
        <button onClick={saveToLocalStorage}>Save</button>
        <input
          type="text"
          placeholder="Filter tasks..."
          onChange={event => onFilterInput(event.target.value)}
        />
        <button onClick={displayAddTask}>New Task</button>
      </footer>
    </div>
  );
}

export default Footer;
