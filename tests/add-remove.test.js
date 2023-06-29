/**
 * @jest-environment jsdom
 */

import Task from '../src/modules/task.js';
import initAddItemToList from '../src/modules/add.js';
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
  const addInput = document.getElementById('add-task-input');

  beforeEach(() => {
    tasks = new Task();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should add item to localstorage', () => {
    addInput.value = 'test value 1';
    tasks.addTask(addInput.value);
    expect(tasks.getTasks().length).toBe(1);
    expect(tasks.getTasks()[0].description).toBe(addInput.value);
    expect(tasks.getTasks()[0].completed).toBe(false);
    expect(tasks.getTasks()[0].index).toBe(1);
  });

  it('should able to add multiple tasks to task', () => {
    for (let index = 0; index < 3; index++) {
      addInput.value = `test description - ${index}`;
      tasks.addTask(addInput.value);
    }
    expect(tasks.getTasks().length).toBe(3);
    expect(tasks.getTasks()[0].description).toBe('test description - 0');
  });

  it('should not add a new item to the storage if input value is empty', () => {
    // Act
    addInput.value = '';
    tasks.addTask(addInput.value);
    expect(tasks.getTasks().length).toBe(0);
    // Assert
  });
});

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
