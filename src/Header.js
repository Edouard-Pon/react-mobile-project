function Header({ taskCount: {done, remaining}}) {
  return (
    <div className="Header">
      <header className="Header-header">
        <h1>Tasks</h1>
        <div>Done: {done}</div>
        <div>Remaining: {remaining}</div>
        <div>Total: {done + remaining}</div>
      </header>
    </div>
  );
}

export default Header;
