<template>
  <div style="background-color: lightblue;">
    <Hello />
    <button @click="click">vue2 button click</button>
  </div>
</template>

<script>
import Hello from './Hello.vue';

export default {
  methods: {
    click() {
      this.$emit('btnClick');
      // vue3 events needs the Camel-Case start with "on"
      this.$emit('onBtnClick');
    },
  },
  components: {
    Hello,
  },
};
</script>