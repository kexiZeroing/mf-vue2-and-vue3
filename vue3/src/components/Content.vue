<template>
  <div style="color: red">
    {{ title }}
    <div>count: {{ count }}</div>
  </div>
</template>

<script>
export default {
  props: ['count'],
  data() {
    return {
      title: 'This is Vue3 content',
    };
  },
};
</script>