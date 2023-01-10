<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { FinishedTasks } from "../composables/Tasks";

const completeTodos = ref([]);
const fetchCompleteTodos = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    completeTodos.value = response.data.filter((item) => item.completed === true);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchCompleteTodos();
});
</script>

<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">Finished Tasks</h6>
      <div class="q-mt-xl">
        <q-card v-for="row in FinishedTasks" :key="row.id" class="q-mt-sm">
          <q-card-section class="bg-primary text-white q-pa-none">
            <div class="text-bold q-pa-md">{{ row.todo || row.title }}</div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm" v-for="row in completeTodos" :key="row.id">
          <q-card-section
            class="bg-primary text-white q-pa-none flex justify-between items-center"
          >
            <div class="text-bold q-pa-md">{{ row.title }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
