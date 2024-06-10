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
import posthog from "posthog-js";

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  data() {
    return {
      todos: [],
      isSortingEnabled: false,
      featureToggle: false
    };
  },
  computed: {
    sortedTodos() {
      if (!this.featureToggle) {
        return this.todos;
      }

      const today = new Date().setHours(0, 0, 0, 0);
      return this.todos.sort((a, b) => {
        const dateA = new Date(a.createdAt).setHours(0, 0, 0, 0);
        const dateB = new Date(b.createdAt).setHours(0, 0, 0, 0);

        if (a.done && b.done) return dateB - dateA;
        if (!a.done && !b.done) return dateB - dateA;
        if (!a.done && dateA < today) return 1;
        return dateB - dateA;
      });
    }
  },
  methods: {
    async getAll() {
      try {
        let todos = await readTodos();
        this.todos = todos;
        this.checkFeatureToggle();
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
    },
    checkFeatureToggle() {
      this.featureToggle = posthog.isFeatureEnabled('todo_sorting_feature');
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