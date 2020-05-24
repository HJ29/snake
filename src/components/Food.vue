<template>
  <div 
    v-if="position"
    class="pixel"
    :style="$snake.getStyle(position)"/>
</template>

<script>
export default {
  props: {
    position: {
      default: null,
      type: Array,
    }
  }
}
</script>