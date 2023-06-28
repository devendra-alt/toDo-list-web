import Task from './modules/task.js';
import initAddItemToList from './modules/add.js';
import localStorageMock from './localstorage-mock.js';
import renderToDoList from '../src/modules/render.js';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

document.body.innerHTML = `
<article id="todoApp">
      <h1>Today's To Do</h1>
      <input id="add-task-input" placeholder="Add to your list..." />
      <ul id="todo-list"></ul>
      <button id="clear-completed-btn">Clear all completed</button>
    </article>
`;

describe('Add Tasks', () => {
  let tasks;
  beforEach(() => {
    tasks = new Task();
    localStorage.clear();
  });

  test('should add item to dom', () => {
    // arrange
    const addInput = document.getElementById('add-task-input');
    const taskList = document.getElementById('todo-list');

    // action
    initAddItemToList(tasks);
    addInput.value = 'test value 1';
    tasks.addTask(addInput.value);
    renderToDoList(tasks);

    // assertion
  });
});
