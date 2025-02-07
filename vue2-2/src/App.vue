<template>
  <div>
    <h3>Vue2 App as Host</h3>

    {{ count }}
    <button @click="inc">inc</button>

    <RemoteButton @btnClick="inc" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const RemoteButton = () => ({
  component: import('vue2App/Button'),
  // loading: { template: '<div>Loading...</div>' },
  // error: { template: '<div>Error!</div>' }, 
  // delay: 200,
  // timeout: 3000
});

const count = ref(0);
const inc = () => {
  count.value++;
}
</script>