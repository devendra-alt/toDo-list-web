/**
 * @jest-environment jsdom
 */

import Task from '../src/modules/task.js';
import localStorageMock from './localstorage-mock.js';

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
    for (let index = 0; index < 3; index += 1) {
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

describe('Remove Task', () => {
  let task;
  beforeEach(() => {
    task = new Task();
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it('should not delete any task if list item is out of range', () => {
    task.addTask('test 1');
    task.addTask('test 2');
    task.addTask('test 3');

    task.deleteTask('4');
    expect(task.getTasks().length).toBe(3);
  });

  it('should delete single item from tasks list', () => {
    task.addTask('test 1');
    task.addTask('test 2');
    task.addTask('test 3');

    task.deleteTask('1');
    const tasks = task.getTasks();
    expect(tasks.length).toBe(2);
    expect(tasks[0].description).toBe('test 2');
  });

  it('should have all indexes in sequence', () => {
    task.addTask('test-1');
    task.addTask('test-2');
    task.addTask('test-3');
    task.addTask('test-4');
    task.addTask('test-5');
    task.addTask('test-6');

    task.deleteTask('1');
    task.deleteTask('3');
    task.deleteTask('4');

    const tasks = task.getTasks();

    tasks.forEach((element, index) => {
      expect(element.index).toBe(index + 1);
    });
  });

  it('should delete multiple tasks at once', () => {
    task.addTask('test-3');
    task.addTask('test-4');
    task.addTask('test-5');
    task.addTask('test-6');

    task.deleteTask('1');
    task.deleteTask('1');
    task.deleteTask('1');

    expect(task.getTasks().length).toBe(1);
  });
});
