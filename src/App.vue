<template>
  <div id="app">
    <div class="content">
    <Header />
    <router-view />
  </div>
  <Footer />
</div>

</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Post from "@/components/Post.vue"

export default {
  name: 'App',
  components: {
    Header,
    Post,
    Footer,
  },
  mounted() {
    this.logMountedComponent();
  },
  methods: {
    logMountedComponent() {
      console.log('App component mounted');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content{
  flex: 1;
}
</style>
