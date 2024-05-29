<template>
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
</template>

<script>
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";
import posthog from "@/posthog"; // Ensure you import posthog instance

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
      let todos = await readTodos();
      if (this.isSortingEnabled) {
        todos.sort((a, b) => {
          return a.done === b.done ? 0 : a.done ? 1 : -1;
        });
      }
      this.todos = todos;
    },
    async post(name) {
      const todo = await createTodo(name);
      this.todos.push(todo);
    },
    async done(id) {
      const todo = await doneTodo(id);
      this.update(id, todo);
    },
    async undone(id) {
      const todo = await undoneTodo(id);
      this.update(id, todo);
    },
    update(id, todo) {
      this.todos = this.todos.map((t) => (t.id === id ? todo : t));
    }
  },
  async created() {
    this.isSortingEnabled = await posthog.isFeatureEnabled('todo_sorting');
    this.getAll();
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>