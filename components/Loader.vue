<template>
  <div class="flex">
    <div
      v-for="i in 3"
      :key="i"
      class="w-4 h-4 bg-sky-600 rounded-full animate-ping"
      :style="{ animationDelay: `${i * 0.3}s` }"
    />
  </div>
</template>
