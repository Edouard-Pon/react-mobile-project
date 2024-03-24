function Header({ taskCount: {done, remaining}, headerOpacity }) {
  return (
    <div className="Header">
      <header className="Header-header" style={{ opacity: headerOpacity }}>
        <div>Done: {done}</div>
        <div>Remaining: {remaining}</div>
        <div>Total: {done + remaining}</div>
      </header>
    </div>
  );
}

export default Header;
