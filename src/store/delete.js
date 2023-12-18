const actions = {
    async deletePost({ commit }, postId) {
      try {
        await fetch(`http://localhost:3000/api/deletePost/${postId}`, {
          method: 'DELETE',
        });
  
        commit('deletePost', postId);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
    async deleteAllPosts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/deleteAllPosts', {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        commit('deleteAllPosts');
  
        console.log('All posts deleted successfully');
      } catch (error) {
        console.error('Error deleting all posts:', error);
      }
    },
  };
  
  export default {
    actions,
  };
  