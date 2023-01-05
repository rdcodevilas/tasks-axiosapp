<script setup>
import { ref } from "vue";
import { MyTasks, FinishedTasks, DeletedTasks } from "../composables/Tasks";

let text = ref(null);

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
  let index = MyTasks.value.findIndex((t) => t.id === selectedTodo.value.id);
  index !== -1 && (MyTasks.value[index].todo = text.value);
  text.value = selectedTodo.value = null;
  form.value.reset();
};

let showDialog = ref(false);
const toggleDialog = (row) => {
  showDialog.value = true;
  toMarkAsDone.value = null;
  toMarkAsDone.value = row;
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

<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">My Tasks</h6>
      <q-form ref="form" @submit="!selectedTodo ? addTodo() : updateTodo()">
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
              :class="`bg-${!selectedTodo ? 'primary' : 'secondary'} fit`"
              color="white"
              glossy
              dense
              flat
              type="submit"
              :icon="!selectedTodo ? 'add' : 'edit'"
            />
          </div>
        </div>
      </q-form>
      <div class="q-mt-xl">
        <!-- separator -->
        <q-card
          @click="selectTodo(row)"
          class="q-mt-sm"
          v-for="row in MyTasks"
          :key="row.id"
        >
          <q-card-section
            class="bg-primary text-white q-pa-none flex justify-between items-center"
          >
            <div class="text-bold q-pl-lg">{{ row.todo }}</div>
            <div class="bg-white q-pa-sm">
              <q-btn
                @click.stop="toggleDialog(row, 'mark-done')"
                flat
                icon="check_circle_outline"
                color="green"
              />

              <!-- change from toggle to remove -->
              <q-btn
                @click.stop="removeTodo(row, 'delete')"
                flat
                icon="delete_outline"
                color="red"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- separator -->

      <q-dialog v-model="showDialog" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <div class="q-ml-sm">
              Are you sure you want to mark
              <span class="text-green">"{{ toMarkAsDone.todo }}"</span> as done?
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              @click="markAsDone()"
              flat
              label="Yes"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
