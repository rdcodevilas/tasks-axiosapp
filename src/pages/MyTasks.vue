<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">My Tasks</h6>
      <q-form>
        <div class="row gap">
          <q-input
            v-model="text"
            dense
            outlined
            label="What's your todo?"
            class="q-pa-none col-10"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
          <div class="col-2 q-pl-sm">
            <q-btn
              class="bg-primary fit"
              color="white"
              glossy
              dense
              flat
              type="submit"
              icon="add"
            />
          </div>
        </div>
      </q-form>
      <div class="q-mt-xl">
        <q-card class="q-mt-sm">
          <q-card-section
            class="bg-primary text-white q-pa-none flex justify-between items-center"
          >
            <div class="text-bold q-pl-lg">Todo</div>
            <div class="bg-white q-pa-sm">
              <q-btn flat icon="check_circle_outline" color="green" />
              <q-btn flat icon="delete_outline" color="red" />
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm" v-for="row in MyTasks" :key="row.id">
          <q-card-section
            class="bg-primary text-white q-pa-none flex justify-between items-center"
          >
            <div class="text-bold q-pl-lg">{{ row.todo }}</div>
            <div class="bg-white q-pa-sm">
              <q-btn flat icon="check_circle_outline" color="green" />
              <q-btn flat icon="delete_outline" color="red" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MyTasks, FinishedTasks, DeletedTasks } from "../composables/Tasks";

let form = ref(null);
const addTodo = () => {
  let id = MyTasks.value.length;
  MyTasks.value.push({ id: ++id, todo: text.value });
  text.value = null;
  form.value.reset();
};
let selectedTodo = ref(null);
const selectTodo = (row) => {
  selectedTodo.value = row;
  text.value = row.todo;
};
const updateTodo = () => {
  let index = TodoList.value.findIndex((t) => t.id === selectedTodo.value.id);
  index !== -1 && (TodoList.value[index].todo = text.value);
  text.value = selectedTodo.value = null;
  form.value.reset();
};
let showDialog = ref(false);
const toggleDialog = (row, status) => {
  showDialog.value = true;
  toMarkAsDone.value = toDelete.value = null;
  status !== "delete" ? (toMarkAsDone.value = row) : (toDelete.value = row);
};

let toMarkAsDone = ref(null);
const markAsDone = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toMarkAsDone.value.id);
  index !== -1 && MyTasks.value.splice(index, 1);
  FinishedTasks.value.push(toMarkAsDone.value);
  toMarkAsDone.value = null;
  showDialog.value = false;
};
let toDelete = ref(null);
const removeTodo = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toDelete.value.id);
  index !== -1 && MyTasks.value.splice(index, 1);
  DeletedTasks.value.push(toDelete.value);
  toDelete.value = null;
  showDialog.value = false;
};
</script>
