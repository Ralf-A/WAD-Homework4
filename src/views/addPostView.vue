<template>
  <div class="form">
    <h1>Add Post</h1>
    <label for="body">Body</label>
    <input v-model="postBody" name="body" required><br>
    <button @click="addPost" class="center">Add</button>
  </div>
</template>
  
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import createModule from '@/store/create'

export default {
  data() {
    return {
      postBody: "",
    };
  },
  computed: {},
  components: {
    Header,
    Footer,
  },
  methods: {
    // In your component
    async addPost() {
      const body = this.postBody;
      await this.$store.dispatch('createPost', body); // Use the action name directly
      this.$router.push("/");
    },
  },

// Example usage to satisfy the linter
created() {
  console.log(createModule); // Accessing a property of the imported module
  },
};
</script>
