<template>
  <NuxtLink
    :to="{
      path: `/post/${post.id}`,
      state: post,
    }"
    @click="saveScroll"
    class="border-l-[6px] border-l-sky-900 bg-white p-4 pb-8 border-zinc-200 border rounded-r-lg hover:bg-gradient-to-r hover:from-sky-50 hover:to-zinc-100 transition-colors"
  >
    <h3 class="text-xl font-semibold">{{ post.title }}</h3>
    <p class="text-gray-500 text-sm mt-1">{{ formatDate(post.created_at) }}</p>
    <p class="text-gray-700 mt-2">{{ post.description }}</p>
  </NuxtLink>
</template>

<script setup>
import { useFormats } from "@/composables/useFormats";

const { formatDate } = useFormats();
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

function saveScroll() {
  sessionStorage.setItem("feedScroll", window.scrollY);
}
</script>
