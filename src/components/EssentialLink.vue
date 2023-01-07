<template>
  <!-- q-item element is being used to create a clickable list item that navigates to a route specified by the route_name variable when clicked. The :to directive is a Vue.js directive that specifies a route to navigate to
when the element is clicked. In this case, the route_name variable is being used
to specify the route to navigate to. -->

  <q-item clickable :to="route_name">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ""
    },

    // It looks like the route_name property is being used to specify a route for the
    // component to navigate to. The default value of "#" indicates that the route is
    // not set by default and will need to be specified.
    route_name: {
      type: String,
      default: "#"
    },

    icon: {
      type: String,
      default: ""
    }
  }
});
</script>
