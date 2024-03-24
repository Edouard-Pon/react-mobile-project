function Header({ taskCount: {done, remaining}, headerOpacity }) {
  return (
    <div className="Header">
      <header className="Header-header" style={{opacity: headerOpacity}}>
        <h1 className="Header-title Header-item">Tasks</h1>
        <div className="Header-item">Done: {done}</div>
        <div className="Header-item">Remaining: {remaining}</div>
        <div className="Header-item">Total: {done + remaining}</div>
      </header>
    </div>
  );
}

export default Header;
