<template>
  <div>
    <h2>Your Todos</h2>
    <ul>
      <li>
        <TodoInput @new-todo="post" />
      </li>
      <li v-for="(todo, i) in todos" :key="i">
        <Todo :todo="todo"
              @done="done"
              @undone="undone"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  data() {
    return {
      todos: [],
      isSortingEnabled: false
    };
  },
  methods: {
    async getAll() {
      try {
        let todos = await readTodos();
        if (this.isSortingEnabled) {
          todos.sort((a, b) => {
            return a.done === b.done ? 0 : a.done ? 1 : -1;
          });
        }
        this.todos = todos;
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    },
    async post(name) {
      try {
        const todo = await createTodo(name);
        this.todos.push(todo);
      } catch (error) {
        console.error("Failed to create todo:", error);
      }
    },
    async done(id) {
      try {
        const todo = await doneTodo(id);
        this.update(id, todo);
      } catch (error) {
        console.error("Failed to mark todo as done:", error);
      }
    },
    async undone(id) {
      try {
        const todo = await undoneTodo(id);
        this.update(id, todo);
      } catch (error) {
        console.error("Failed to mark todo as undone:", error);
      }
    },
    update(id, todo) {
      this.todos = this.todos.map((t) => (t.id === id ? todo : t));
    }
  },
  async created() {
    await this.getAll();
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>