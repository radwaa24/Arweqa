<template>
  <body class="w-full bg-zinc-100 p-4 min-h-screen">
    <main class="max-w-4xl mx-auto">
      <header
        class="flex flex-col md:flex-row gap-2 justify-between items-center mb-4"
      >
        <h1 class="text-2xl text-sky-900 font-bold text-center">Posts</h1>

        <Search :data="posts" @update="onSearchUpdate" />
      </header>
      <div
        v-if="searchValue && !filteredPosts.length"
        class="text-center font-semibold text-sky-900 bg-zinc-50 my-10 p-4"
      >
        No Post found
      </div>
      <section v-else class="flex flex-col gap-6">
        <Post v-for="post in currentPosts" :key="post.id" :post="post" />
        <div
          v-if="!loading && reachedTheEnd"
          class="font-semibold text-sky-900"
        >
          You've reached the end.
        </div>
      </section>
    </main>

    <!-- for loader -->
    <div v-if="loading" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <Loader :loading="loading" />
    </div>
  </body>
</template>

<script setup>
import usePosts from "@/composables/usePosts";

const { posts, loading, getPosts, loadMore, reachedTheEnd } = usePosts();
const filteredPosts = ref([]);
const searchValue = ref("");

// Computed property to decide which posts to display
const currentPosts = computed(() =>
  filteredPosts.value.length > 0 ? filteredPosts.value : posts.value
);

// search by title or description
function onSearchUpdate({ filteredPosts: filtered, searchValue: value }) {
  filteredPosts.value = filtered;
  searchValue.value = value;
}
//Correct infinite scroll logic
function handleScroll() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 200; // 200px from bottom
  if (scrollPosition >= threshold && !loading.value && !reachedTheEnd.value) {
    loadMore();
  }
}

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  await getPosts().then(() => {
    // Restore scroll position after posts are rendered
    nextTick(() => {
      const savedScroll = sessionStorage.getItem("feedScroll");
      if (savedScroll) {
        window.scrollTo({ top: Number(savedScroll), behavior: "auto" });
        console.log("Restored scroll position:", savedScroll);
      }
    });
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
