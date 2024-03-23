import './App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, name: 'Task 1', done: false },
        { id: 2, name: 'Task 2', done: false },
        { id: 3, name: 'Task 3', done: false }
      ],
      filter: ''
    };
  }

  taskCount = () => {
    const done = this.state.tasks.filter(task => task.done).length;
    const remaining = this.state.tasks.length - done;
    return {done, remaining};
  }

  handleFilterInput = (filter) => {
    this.setState({ filter: filter });
  }

  filteredTasks = () => {
    return this.state.tasks.filter(task => task.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  }

  handleTaskStatus = (id, checked) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => task.id === id ? { ...task, done: checked } : task)
    }));
  }

  addTask = (name) => {
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        { id: prevState.tasks.length + 1, name, done: false }
      ]
    }));
  }

  deleteTask = (id) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id)
    }));
  }

  render() {
    return (
      <div className="App">
        <Header taskCount={this.taskCount()}/>
        <ul>
          {this.filteredTasks().map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={event => this.handleTaskStatus(task.id, event.target.checked)}
              />
              <span className={task.done ? 'task-done' : 'task-not-done'}>
                {task.name}
              </span>
              <button onClick={() => this.deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <Footer
          onFilterInput={this.handleFilterInput}
          onAddTask={this.addTask}
        />
      </div>
    );
  }
}

export default App;
