import type { Todo } from "./todo.types.js";

class TodoService {
  private todos: Todo[] = [];
  private counter = 1;

  async getAll(): Promise<Todo[]> {
    return this.todos;
  }

  async create(title: string): Promise<Todo> {
    const todo: Todo = {
      id: this.counter++,
      title,
    };

    this.todos.push(todo);
    return todo;
  }

  async delete(id: number): Promise<void> {
    const index = this.todos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error("Todo not found");
    }

    this.todos.splice(index, 1);
  }
}

export default new TodoService();
