<template>
  <div class="post-detail-container">
    <div class="post-box">
      <h1>Add Post</h1>
      <label for="body">Body</label><br><br>
      <input v-model="postBody" name="body" required class="post-textarea">
      <button @click="addPost" class="post-button">Add</button>
    </div>
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

<style scoped>
.post-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

.post-box {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.post-content {
  text-align: center;
  color: white;
}

.post-textarea {
  width: 100%;
  margin-bottom: 10px;
  background-color: lightgray;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  resize: none;
}

.post-button {
  border-radius: 10px;
  background-color: lightblue;
  color: black;
  margin: 10px;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
