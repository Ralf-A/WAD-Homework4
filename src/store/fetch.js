const fetchModule = {
    state: {
      posts: [], // Initialize posts as an empty array
    },
    mutations: {
      setPosts(state, posts) {
        state.posts = posts;
      },
    },
    actions: {
      async fetchPosts({ commit }) {
        try {
          const response = await fetch('http://localhost:3000/api/receivePosts');
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
  
          commit('setPosts', data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      async fetchPost({ commit }, postId) {
        try {
          const response = await fetch(`http://localhost:3000/api/receivePost/${postId}`);
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
  
          commit('setCurrentPost', data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      },
    },
  };
  
  export default fetchModule;
  