function Footer({ onFilterInput, displayAddTask }) {
  return (
    <div className="Footer">
      <footer className="Footer-footer">
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
