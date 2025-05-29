import { useToast } from "vue-toastification";

export default function useInfinitePosts() {
  const toast = useToast();
  const posts = ref([]);
  const loading = ref(true);
  const currentPage = ref(1);
  const lastPage = ref(null);
  const reachedTheEnd = ref(false);
  async function getPosts() {
    loading.value = true;

    await fetch(`http://13.60.56.112/api/posts?page=${currentPage.value}`)
      .then((res) => res.json())
      .then((res) => {
        loading.value = false;
        posts.value = [...posts.value, ...res.data];
        currentPage.value = res.current_page + 1;
        lastPage.value = res.last_page;
      })
      .catch((err) => {
        loading.value = false;
        toast.error("Failed to load posts. Please try again.");
        // in case rendering an error from the API $toast.error(err);
      });
  }
  function loadMore() {
    if (currentPage.value == lastPage.value) {
      reachedTheEnd.value = true;
    } else {
      getPosts();
    }
  }
  return {
    posts,
    loading,
    reachedTheEnd,
    getPosts,
    loadMore,
  };
}
