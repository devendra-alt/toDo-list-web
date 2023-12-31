class Task {
  #tasks;

  constructor() {
    const storedData = localStorage.getItem('tasks');
    this.#tasks = storedData ? JSON.parse(storedData) : [];
  }

  getTasks() {
    return this.#tasks;
  }

  setTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  addTask(description) {
    if (!description) {
      return;
    }
    const newTask = {
      index: this.#tasks.length + 1,
      description,
      completed: false,
    };
    this.#tasks.push(newTask);
    this.setTasks();
  }

  updateStatus(index) {
    const intIndex = parseInt(index, 10);
    this.#tasks = this.#tasks.map((task) => {
      if (task.index === intIndex) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.setTasks();
  }

  updateIndices() {
    this.#tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  deleteAllCompleted() {
    this.#tasks = this.#tasks.filter((task) => !task.completed);
    this.updateIndices();
    this.setTasks();
  }

  deleteTask(index) {
    const intIndex = parseInt(index, 10);
    this.#tasks = this.#tasks.filter((task) => task.index !== intIndex);
    this.updateIndices();
    this.setTasks();
  }

  updateDescription(description, index) {
    const intIndex = parseInt(index, 10);
    const updatedDescription = description;
    this.#tasks = this.#tasks.map((task) => {
      if (task.index === intIndex) {
        return { ...task, description: updatedDescription };
      }
      return task;
    });
    this.setTasks();
  }
}

export default Task;
