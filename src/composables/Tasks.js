// This is a Vue.js module that exports three reactive variables: MyTasks, FinishedTasks, and DeletedTasks and being used to store lists of to-do items that are classified as "My Tasks", "Finished Tasks", or "Deleted Tasks".
import {
  ref
} from 'vue';

// the MyTasks, FinishedTasks, and DeletedTasks variables are all being initialized with an empty array.They are being exported so that they can be used in other parts of the application.
let MyTasks = ref([])
let FinishedTasks = ref([])
let DeletedTasks = ref([])

export {
  MyTasks,
  FinishedTasks,
  DeletedTasks
}
