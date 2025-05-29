<template>
  <div class="max-w-3xl flex flex-col gap-4 justify-center h-screen mx-auto">
    <NuxtLink to="/" class="text-sky-700 hover:underline mb-4 inline-block"
      >← Back to Posts</NuxtLink
    >

    <div class="">
      <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
      <p class="text-gray-500 text-sm mb-2">{{ formatDate(created_at) }}</p>
      <p class="text-lg text-gray-700 whitespace-pre-line mt-4">
        {{ post.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useFormats } from "@/composables/useFormats";

const { formatDate } = useFormats();
const post = ref({});

onMounted(() => {
  post.value = window.history.state;
});
</script>
