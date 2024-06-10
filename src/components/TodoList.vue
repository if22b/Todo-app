<template>
  <div>
    <h2>Your Todos</h2>
    <ul>
      <li>
        <TodoInput @new-todo="post" />
      </li>
      <li v-for="(todo, i) in sortedTodos" :key="i">
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
  computed: {
    sortedTodos() {
      if (this.isSortingEnabled) {
        return this.todos.sort((a, b) => {
          if (a.done === b.done) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
          return a.done ? 1 : -1;
        });
      }
      return this.todos;
    }
  },
  methods: {
    async getAll() {
      try {
        let todos = await readTodos();
        this.todos = todos.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
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
    // Ensure flags are loaded before usage.
    this.$posthog.onFeatureFlags(() => {
      this.isSortingEnabled = this.$posthog.isFeatureEnabled('sort-todos-by-date');
      this.getAll();
    });
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
