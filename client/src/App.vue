<template>
  <h1>app</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(async () => {
      try {
        const testRequest = await fetch('http://localhost:3000/');
        const data = await testRequest.json();

        console.log('Success', data);
      } catch (error) {
        console.log('Err', error);
      }
    })
  },
});
</script>