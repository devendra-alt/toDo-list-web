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
    expect(tasks.length).to.equal(1);
    expect(tasks[0].description).to.equal(addInput.value);
    expect(tasks[0].completed).to.equal(false);
    expect(tasks[0].index).to.equal(1);
  });

  it('should able to add multiple tasks to task', () => {
    // Arrange
    const addInput = document.getElementById('add-task-input');
    const taskList = document.getElementById('todo-list');

    // Act
    initAddItemToList(tasks);
    const tasks = [
      { index: 1, description: 'test value 1', completed: false },
      { index: 2, description: 'test value 2', completed: false },
      { index: 3, description: 'test value 3', completed: false },
    ];
    renderToDoList(tasks);

    // Assert
    expect(tasks).toEqual([
      { index: 1, description: 'test value 1', completed: false },
      { index: 2, description: 'test value 2', completed: false },
      { index: 3, description: 'test value 3', completed: false },
    ]);
  });

  it('should not add a new item to the storage if input value is empty', () => {
    // Arrange
    const addInput = document.getElementById('add-task-input');
    const taskList = document.getElementById('todo-list');
    addInput.value = '';

    // Act
    initAddItemToList(tasks);

    // Assert
    tasks();
    expect(tasks.length).to.equal(0);
  });
});
