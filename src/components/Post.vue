<template>
  <li class="post-item">
    <div class="post-content">
      <div class="post-text">
        <p>{{ post.body }}</p>
        <p class="post-info">
          <strong>Date:</strong> {{ formatDate(post.date) }}
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log('Received post data:', this.post);
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    },
  },
};
</script>
<style scoped>
.post-item {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.37);
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.post-profile {
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;
  z-index: 1;
}

.profile-picture {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.post-info {
  position: absolute;
  top: 16px;
  right: 16px;
  margin: 0;
}

.profile-name {
  margin: 0;
}

.post-text {
  flex: 3;
  padding: 16px;
}

.post-content {
  text-align: center;
  display: flex;
  align-items: flex-start;
}

.post-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-image {
  max-width: 100%;
  max-height: 300px;
  padding: 10px;
  border-radius: 8px;
}

.post-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
}
</style>
