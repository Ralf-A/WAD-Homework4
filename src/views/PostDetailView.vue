<template>
  <div class="post-detail-container">
    <h1>Post Detail</h1>
    <div v-if="post" class="post-content">
      <textarea v-model="updatedBody" class="post-textarea">{{ post.body }}</textarea>
      <p>Posted on: {{ formatDate(post.date) }}</p>
      <div class="button-container">
        <button @click="updatePost">Update</button>
        <button @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  computed: {
    post() {
      return this.$store.state.currentPost;
    },
  },
  watch: {
    post: {
      handler(newPost) {
        this.updatedBody = newPost ? newPost.body : '';
      },
      immediate: true, // Trigger the handler immediately
    },
  },
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      updatedBody: "",
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.postId;
      this.$store.dispatch('fetchPost', postId);
    },
    async deletePost() {
      const postId = this.post.id;
      this.$store.dispatch('deletePost', postId);
      this.$router.push('/');
    },
    async updatePost() {
      const postId = this.$route.params.postId;
      this.$store.dispatch('updatePost', { postId, updatedBody: this.updatedBody });
      this.$router.push('/');
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.post-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-content {
  text-align: center;
}

.post-textarea {
  width: 100%;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  gap: 10px;
}
</style>
