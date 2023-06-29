<template>
  <div class="w-96 mx-auto p-5">
    <div>
      <h1 class="text-center text-4xl p-5">Task List</h1>
    </div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newTodoText"
            class="input"
            id="text"
            name="text"
            type="text"
            placeholder="Add a todo"
          />
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!newTodoText">Add</button>
        </p>
      </div>
    </form>

    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card mb-3"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.text }}
            </div>

            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const todos = ref<Todo[]>([]);

onMounted((): void => {
  onSnapshot(collection(db, "todos"), (querySnapshot) => {
    const fbTodos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      const todo: Todo = {
        id: doc.id,
        text: doc.data().text,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

const newTodoText = ref<string>("");

const addTodo = (): void => {
  addDoc(collection(db, "todos"), {
    text: newTodoText.value,
    done: false,
  });
  newTodoText.value = "";
};

const deleteTodo = (id: string): void => {
  deleteDoc(doc(collection(db, "todos"), id));
};

const toggleDone = (id: string): void => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(collection(db, "todos"), id), {
    done: !todos.value[index].done,
  });
};
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
