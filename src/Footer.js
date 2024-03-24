import React from 'react';

function Footer({ onSearchInput, displayAddTask, saveToLocalStorage }) {
  return (
    <div className="Footer">
      <footer className="Footer-footer">
        <button onClick={saveToLocalStorage}>Save</button>
        <input
          type="text"
          placeholder="Quick search..."
          onChange={event => onSearchInput(event.target.value)}
        />
        <button onClick={displayAddTask}>New Task</button>
      </footer>
    </div>
  );
}

export default Footer;
