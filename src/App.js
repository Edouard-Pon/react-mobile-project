import './App.css';
import React from 'react';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: ''
    };
  }

  taskCount() {
    const done = this.state.tasks.filter(task => task.done).length;
    const remaining = this.state.tasks.length - done;
    return {done, remaining};
  }

  render() {
    return (
      <div className="App">
        <Header taskCount={this.taskCount()}/>
        <div>Tasks</div>
      </div>
    );
  }
}

export default App;
