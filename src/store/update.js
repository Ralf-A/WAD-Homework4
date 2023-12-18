const actions = {
    async updatePost({ commit, state }, { postId, updatedBody }) {
      try {
        const currentDate = new Date().toISOString();
  
        const response = await fetch(`http://localhost:3000/api/updatePost/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: updatedBody,
            date: currentDate,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const updatedPost = await response.json();
        commit('updatePost', updatedPost);
  
        console.log('Post updated successfully:', updatedPost);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
  };
  
  export default {
    actions,
  };
  