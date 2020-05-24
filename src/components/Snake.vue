<template>
  <div>
    <div
      class="pixel"
      :style="$snake.getStyle(position)"
      v-for="(position, index) in positions"
      :key="index"/>
  </div>
</template>

<script>
export default {
  props: {
    positions: {
      default: () => [],
      type: Array,
    }
  },
}
</script>