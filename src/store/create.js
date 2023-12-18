// create.js
const createModule = {
    actions: {
      async createPost({ commit }, body) {
        try {
          const currentDate = new Date().toISOString();
  
          const response = await fetch('http://localhost:3000/api/createPost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              body,
              date: currentDate,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const newPost = await response.json();
  
          commit('addPost', newPost);
  
          console.log('Post created successfully:', newPost);
        } catch (error) {
          console.error('Error creating post:', error);
        }
      },
    },
  };
  
  export default createModule;
  