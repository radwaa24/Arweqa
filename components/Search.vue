<template>
  <div>
    <input
      v-model="title"
      type="text"
      class="p-3 rounded-lg border-zinc-200 border"
      placeholder="Search "
      @input="searchPost"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update"]);
const title = ref("");

const searchPost = () => {
  const searchValue = title.value.toLowerCase();
  let filteredPosts = props.data;
  if (searchValue) {
    filteredPosts = props.data.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchValue) ||
        item.description?.toLowerCase().includes(searchValue)
    );
  }
  emit("update", { filteredPosts, searchValue: title.value });
};
</script>
