<!-- eslint-disable vue/no-parsing-error -->
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { MyTasks, FinishedTasks, DeletedTasks } from "../composables/Tasks";

let text = ref(null);

const incompleteTodos = ref([]);
const fetchIncompleteTodos = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    incompleteTodos.value = response.data.filter((item) => !item.completed);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchIncompleteTodos();
});
// addTodo function that adds an object to an array called MyTasks and resets a form element.
const addTodo = () => {
  let id = MyTasks.value.length;
  MyTasks.value.push({ id: ++id, todo: text.value });
  // create a POST request using axios on https://jsonplaceholder.typicode.com/todos
  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: text.value,
      completed: false,
    },
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  text.value = null;
  this.$refs.form.reset();
};
// The selectTodo function is likely called when a user selects a to-do item from a list, in order to update the form fields with the selected to-do's data.
let selectedTodo = ref(null);
const selectTodo = (row) => {
  selectedTodo.value = row;
  text.value = row.todo;
};
//The updateTodo function is likely called when a user submits an update to a to-do item in a form.
//Added the axios PUT request inside the updateTodo function, after updating the selected todo item in MyTasks array.
//NOT WORKING
const updateTodo = () => {
  let index = MyTasks.value.findIndex((t) => t.id === selectedTodo.value.id);
  if (index !== -1) {
    MyTasks.value[index].todo = text.value;

    axios
      .put("https://jsonplaceholder.typicode.com/todos/" + selectedTodo.value.id, {
        title: text.value,
        completed: false,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  text.value = selectedTodo.value = null;
  form.value.reset();
};
//The toggleDialog function takes two arguments: row, which is an object representing a to-do item, and status, which is a string that specifies the action to take. If status is not equal to "delete", the function sets the value of the toMarkAsDone variable to row. Otherwise, it sets the value of the toDelete variable to row. The function also sets the value of the showDialog variable to true.
let showDialog = ref(false);
const toggleDialog = (row, status) => {
  showDialog.value = true;
  toMarkAsDone.value = toDelete.value = null;
  status !== "delete" ? (toMarkAsDone.value = row) : (toDelete.value = row);
};
//The markAsDone function starts by finding the index of the to-do item that is to be marked as done (stored in the toMarkAsDone variable) in the MyTasks array using the findIndex method. If the index is not equal to -1, the function removes the to-do item from the MyTasks array using the splice method. The to-do item is then added to the FinishedTasks array using the push method. The toMarkAsDone variable is set to null, and the value of the showDialog variable is set to false, which hides the dialog.
let toMarkAsDone = ref(null);
const markAsDone = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toMarkAsDone.value.id);
  index !== -1 && MyTasks.value.splice(index, 1);
  FinishedTasks.value.push(toMarkAsDone.value);
  toMarkAsDone.value = null;
  showDialog.value = false;
};
//I've added the axios DELETE request inside the removeTodo function, after removing the selected todo item from MyTasks array and pushing it to DeletedTasks array.
//The removeTodo function starts by finding the index of the to-do item that is to be removed (stored in the toDelete variable) in the MyTasks array using the findIndex method. If the index is not equal to -1, the function removes the to-do item from the MyTasks array using the splice method. The to-do item is then added to the DeletedTasks array using the push method. The toDelete variable is set to null, and the value of the showDialog variable is set to false, which hides the dialog.
let toDelete = ref(null);
const removeTodo = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toDelete.value.id);
  if (index !== -1) {
    MyTasks.value.splice(index, 1);
    DeletedTasks.value.push(toDelete.value);
    axios
      .delete("https://jsonplaceholder.typicode.com/todos/" + toDelete.value.id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  toDelete.value = null;
  showDialog.value = false;
};
</script>

<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">My Tasks</h6>
      <!-- The q-form element represents a form element, and the ref attribute is a Vue.js directive that binds the element to a reference in the Vue instance. -->
      <q-form ref="form" @submit="!selectedTodo ? addTodo() : updateTodo()">
        <!-- The q-input element represents an input field, and the v-model directive is a two-way data binding directive that binds the value of the input field to a variable in the Vue instance. In this case, the value of the input field is being bound to the text variable. -->
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
            <!-- The q-btn element represents a button, and the :class attribute is a directive that binds the value of the attribute to a dynamic class for the button element. In this case, the class of the button element is set based on the value of the selectedTodo variable. If selectedTodo is null, the class will be bg-primary fit, otherwise it will be bg-secondary fit. -->
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
        <!-- The q-card element represents a card element, and the @click directive is a Vue.js event binding directive that binds the click event of the card element to a function. In this case, the function being called on click is selectTodo, and it is passed the row variable as an argument. -->
        <q-card
          @click="selectTodo(row)"
          class="q-mt-sm"
          v-for="row in MyTasks"
          :key="row.id"
          alert
        >
          <q-card-section
            class="bg-primary text-white q-pa-none flex justify-between items-center"
          >
            <div class="text-bold q-pl-lg">{{ row.todo || row.title }}</div>
            <div class="bg-white q-pa-sm">
              <q-btn
                @click.stop="toggleDialog(row, 'mark-done')"
                flat
                icon="check_circle_outline"
                color="green"
              />
              <q-btn
                @click.stop="toggleDialog(row, 'delete')"
                flat
                icon="delete_outline"
                color="red"
              />
            </div>
          </q-card-section>
        </q-card>
        <!-- from axios  -->
        <q-card
          @click="selectTodo(row)"
          class="q-mt-sm"
          v-for="row in incompleteTodos"
          :key="row.id"
        >
          <q-card-section
            class="bg-primary text-white q-pa-none flex justify-between items-center"
          >
            <div class="text-bold q-pl-lg">{{ row.title }}</div>
            <div class="bg-white q-pa-sm">
              <q-btn
                @click.stop="toggleDialog(row, 'mark-done')"
                flat
                icon="check_circle_outline"
                color="green"
              />
              <q-btn
                @click.stop="toggleDialog(row, 'delete')"
                flat
                icon="delete_outline"
                color="red"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <q-dialog v-model="showDialog" persistent>
        <q-card>
          <!-- The q-card-section element represents a section of a card element, and the class attribute specifies a class for the card section element, his card section is being used to display a confirmation message when a user wants to mark a to-do item as done or delete it.  -->
          <q-card-section class="row items-center">
            <div v-if="toMarkAsDone" class="q-ml-sm">
              Are you sure you want to mark
              <span class="text-green"
                >"{{ toMarkAsDone.todo || toMarkAsDone.title }}"</span
              >
              as done?
            </div>
            <div v-else class="q-ml-sm">
              Are you sure you want to mark
              <span class="text-red">"{{ toDelete.todo || toDelete.title }}"</span>
              as delete?
            </div>
          </q-card-section>
          <!-- The q-btn element represents a button, and the flat attribute specifies that the button should have a flat style. The label attribute specifies the label for the button, and the color attribute specifies the color of the button text. The @click directive is a Vue.js event binding directive that binds the click event of the button element to a function. In this case, the function being called on click is either markAsDone or removeTodo, depending on the value of the toMarkAsDone variable. -->
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              @click="toMarkAsDone ? markAsDone() : removeTodo()"
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
