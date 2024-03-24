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
        { id: '1', name: 'Task 1', done: false, order: 1 },
        { id: '2', name: 'Task 2', done: false, order: 2 },
        { id: '3', name: 'Task 3', done: false, order: 3},
        { id: '4', name: 'Task 4', done: false, order: 4 },
        { id: '5', name: 'Task 5', done: false, order: 5 }
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
      if (name.trim() === '') return;
      this.setState(prevState => ({
        tasks: [
          ...prevState.tasks,
          { id: uuid(), name, done: false, order: prevState.tasks.length + 1 }
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

  moveTask = (id, direction) => {
    this.setState(prevState => {
      const tasks = [...prevState.tasks];
      const taskIndex = tasks.findIndex(task => task.id === id);

      if (direction === 'up' && taskIndex > 0) {
        [tasks[taskIndex - 1], tasks[taskIndex]] = [tasks[taskIndex], tasks[taskIndex - 1]];
      } else if (direction === 'down' && taskIndex < tasks.length - 1) {
        [tasks[taskIndex + 1], tasks[taskIndex]] = [tasks[taskIndex], tasks[taskIndex + 1]];
      }

      tasks.forEach((task, index) => {
        task.order = index + 1;
      });

      return { tasks };
    });
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
              <button disabled={task.order === 1} onClick={() => this.moveTask(task.id, 'up')}>Move Up</button>
              <button disabled={task.order === this.state.tasks.length} onClick={() => this.moveTask(task.id, 'down')}>Move Down</button>
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
