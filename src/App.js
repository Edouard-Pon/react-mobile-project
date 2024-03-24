import './App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { v4 as uuid } from 'uuid';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: '1', name: 'Task 1', done: false, order: 1, limitDate: '2021-12-31', category: 'priority' },
        { id: '2', name: 'Task 2', done: false, order: 2, limitDate: '2021-12-31', category: 'priority' },
        { id: '3', name: 'Task 3', done: false, order: 3, limitDate: '2021-12-31', category: 'email' },
        { id: '4', name: 'Task 4', done: false, order: 4, limitDate: '2021-12-31', category: 'important' },
        { id: '5', name: 'Task 5', done: false, order: 5, limitDate: '2021-12-31', category: 'priority' }
      ],
      filter: '',
      selectedTask: null,
      isPopupVisible: false,
      headerOpacity: 1
    };
  }

  componentDidMount() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      const userConfirmation = window.confirm("Do you want to load the tasks from localStorage?");
      if (userConfirmation) {
        this.loadFromLocalStorage(tasks);
      }
    }
  }

  taskCount = () => {
    const tasks = this.filteredTasks();
    const done = tasks.filter(task => task.done).length;
    const remaining = tasks.length - done;
    return {done, remaining};
  }

  handleSearchInput = (search) => {
    this.setState({ filter: search });

    if (search.trim().length >= 3 || search.trim().length === 0) {
      this.setState({ headerOpacity: 1 });
    } else if (search.trim().length < 3 && search.trim().length > 0) {
      this.setState({ headerOpacity: 0.5 });
    }
  }

  filteredTasks = () => {
    const { tasks, filter } = this.state;
    let filteredTasks = tasks;
    if (filter.trim().length >= 3) {
      filteredTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(filter.toLowerCase()));
    }
    return filteredTasks;
  }

  handleTaskStatus = (id, checked) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => task.id === id ? { ...task, done: checked } : task)
    }));
  }

  handleTaskEvent = (name, limitDate, category) => {
    if (this.state.selectedTask) {
      if (name.trim() === '') return;
      this.setState(prevState => ({
        tasks: prevState.tasks.map(task =>
          task.id === prevState.selectedTask.id ? { ...task, name, limitDate, category } : task
        ),
        selectedTask: null
      }));
    } else {
      if (name.trim() === '') return;
      this.setState(prevState => ({
        tasks: [
          ...prevState.tasks,
          { id: uuid(), name, done: false, order: prevState.tasks.length + 1, limitDate, category }
        ]
      }));
    }
  }

  deleteTask = (id) => {
    this.setState(prevState => {
      const tasks = prevState.tasks.filter(task => task.id !== id);
      tasks.forEach((task, index) => {
        task.order = index + 1;
      });
      return { tasks };
    });
  }

  displayEditTask = (task) => {
    this.setState({ selectedTask: task, isPopupVisible: true });
  }

  displayAddTask = () => {
    this.setState({ isPopupVisible: true });
  }

  closePopup = () => {
    this.setState({ isPopupVisible: false, selectedTask: null });
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

  saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  loadFromLocalStorage = (tasks) => {
    tasks = JSON.parse(tasks);
    if (tasks) {
      this.setState({ tasks });
    }
  }

  spanClass = (task) => {
    const dateLimitExceeded = new Date() < new Date(task.limitDate);
    const limitDateExists = task.limitDate;

    let spanClass = '';
    if (!limitDateExists && !dateLimitExceeded) {
      spanClass = 'App-task-item-span-three';
    } else if (!limitDateExists || dateLimitExceeded) {
      spanClass = 'App-task-item-span-two';
    }
    return spanClass;
  }

  render() {
    return (
      <div className="App">
        <Header
          taskCount={this.taskCount()}
          headerOpacity={this.state.headerOpacity}
        />
        <div className="App-tasks">
          <ul>
            {this.filteredTasks().map(task => (
              <li className="App-task" key={task.id}>
                <div className={`${task.done ? 'task-done' : ''} App-task-item center`}>
                  {
                    (task.category === 'priority' && <PriorityHighIcon/>) ||
                    (task.category === 'important' && <LabelImportantIcon/>) ||
                    (task.category === 'email' && <EmailIcon/>)
                  }
                </div>
                <div className={`${task.done ? 'task-done' : ''} App-task-item center`}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={event => this.handleTaskStatus(task.id, event.target.checked)}
                  />
                </div>
                <div className={`${task.done ? 'task-done' : ''} App-task-item ${this.spanClass(task)}`}>
                  <span>
                    {task.name}
                  </span>
                </div>
                {task.limitDate && <span className={`${task.done ? 'task-done' : ''} App-task-item center`}>{new Date(task.limitDate).toLocaleDateString('en-GB')}</span>}
                {new Date() > new Date(task.limitDate) && <span className={`${task.done ? 'task-done' : ''} App-task-item`}>Date limit exceeded!</span>}
                <div className="App-task-item App-buttons">
                  <button className="btn-primary" onClick={() => this.displayEditTask(task)}>
                    <EditIcon/>
                  </button>
                  <button className="btn-danger" onClick={() => this.deleteTask(task.id)}>
                    <DeleteForeverIcon/>
                  </button>
                  <button
                    className="btn-primary"
                    disabled={task.order === 1 || this.state.filter !== ''}
                    onClick={() => this.moveTask(task.id, 'up')}>
                    <ArrowUpwardIcon/>
                  </button>
                  <button
                    className="btn-danger"
                    disabled={task.order === this.state.tasks.length || this.state.filter !== ''}
                    onClick={() => this.moveTask(task.id, 'down')}>
                    <ArrowDownwardIcon/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Modal
          isVisible={this.state.isPopupVisible}
          handleTaskEvent={this.handleTaskEvent}
          onClose={this.closePopup}
          initialTaskName={this.state.selectedTask ? this.state.selectedTask.name : ''}
          initialLimitDate={this.state.selectedTask ? this.state.selectedTask.limitDate : ''}
          initialCategory={this.state.selectedTask ? this.state.selectedTask.category : ''}
        />
        <Footer
          onSearchInput={this.handleSearchInput}
          displayAddTask={this.displayAddTask}
          saveToLocalStorage={this.saveToLocalStorage}
        />
      </div>
    );
  }
}

export default App;
