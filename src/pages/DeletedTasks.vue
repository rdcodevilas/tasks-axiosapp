<script setup>
import { ref } from "vue";
import { DeletedTasks } from "../composables/Tasks";
</script>

<!-- The template element is a Vue.js element that is used to wrap template fragments that are not rendered directly to the DOM.
-->
<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">My Deleted Tasks</h6>
      <div class="q-mt-xl">
        <!-- The <q-card> element represents a card element, and the v-for directive is a Vue.js directive that renders the card element multiple times based on an array. In this case, the card element will be rendered once for each item in the DeletedTasks array. The :key attribute is a directive that specifies a unique key for each rendered card element, and it is set to the id property of the row object. -->
        <q-card v-for="row in DeletedTasks" :key="row.id" class="q-mt-sm">
          <q-card-section class="bg-primary text-white q-pa-none">
            <div class="text-bold q-pa-md">{{ row.todo || row.title }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
