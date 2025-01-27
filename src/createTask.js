export class Task {
  constructor(name, description, dueDate, priority, completed = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}
