<template>
  <div>
    <div id="posts-container">
      <button @click="logout">Logout</button>
      <ul class="post-list" v-if="posts && posts.length">
        <!-- Use router-link to make each post clickable -->
        <router-link
          v-for="post in posts"
          :key="post.id"
          :to="{ name: 'PostDetail', params: { postId: post.id } }"
        >
          <Post :post="post" />
        </router-link>
      </ul>

      <div v-if="loading">
        <!-- Loading indicator or message -->
        Loading...
      </div>
      <router-link :to="{ name: 'AddPost' }">
        <button>Add Post</button>
      </router-link>
      <button @click="handleDeleteAllPosts">Delete All Posts</button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Post from "@/components/Post.vue";
import { mapState, mapActions } from 'vuex';
import logout from '@/services/logout';

export default {
  computed: {
    ...mapState(['posts']),
    loading() {
      return this.posts ? this.posts.length === 0 : true;
    },
  },
  components: {
    Header,
    Footer,
    Post,
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    ...mapActions(['fetchPosts', 'deleteAllPosts']),
    async logout() {
      await logout(); // Call the logout method from the service
    },
    handleDeleteAllPosts() {
      this.deleteAllPosts();
    },
  },
};
</script>

<style>
  /* Add your styles if needed */
</style>
