import axios from 'axios';

export default {
  methods: {
    createTodo() {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
          // data for the new to-do item
        })
        .then(response => {
          // handle the response data
          this.$refs.output.innerHTML = JSON.stringify(response.data);
        })
        .catch(error => {
          // handle the error
          this.$refs.output.innerHTML = JSON.stringify(error);
        });
    }
  }
}
