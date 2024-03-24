import './App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { v4 as uuid } from 'uuid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: '1', name: 'Task 1', done: false },
        { id: '2', name: 'Task 2', done: false },
        { id: '3', name: 'Task 3', done: false }
      ],
      filter: '',
      selectedTask: null,
      isPopupVisible: false
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

  handleTaskEvent = (name) => {
    if (this.state.selectedTask) {
      this.setState(prevState => ({
        tasks: prevState.tasks.map(task => task.id === prevState.selectedTask.id ? { ...task, name } : task),
        selectedTask: null
      }));
    } else {
      this.setState(prevState => ({
        tasks: [
          ...prevState.tasks,
          { id: uuid(), name, done: false }
        ]
      }));
    }
  }

  deleteTask = (id) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id)
    }));
  }

  displayEditTask = (task) => {
    this.setState({ selectedTask: task, isPopupVisible: true });
  }

  displayAddTask = () => {
    this.setState({ isPopupVisible: true });
  }

  closePopup = () => {
    this.setState({ isPopupVisible: false });
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
              <button onClick={() => this.displayEditTask(task)}>Edit</button>
              <button onClick={() => this.deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <Modal
          isVisible={this.state.isPopupVisible}
          handleTaskEvent={this.handleTaskEvent}
          onClose={this.closePopup}
          initialTaskName={this.state.selectedTask ? this.state.selectedTask.name : ''}
        />
        <Footer
          onFilterInput={this.handleFilterInput}
          displayAddTask={this.displayAddTask}
        />
      </div>
    );
  }
}

export default App;
