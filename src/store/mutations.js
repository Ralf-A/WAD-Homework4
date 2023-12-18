const mutations = {
    addPost(state, newPost) {
        // Assuming 'posts' is an array in your state
        state.posts.push(newPost);
    },
    deletePost(state, postId) {
        // Assuming 'posts' is an array in your state
        state.posts = state.posts.filter(post => post.id !== postId);
    },
    deleteAllPosts(state) {
        // Assuming 'posts' is an array in your state
        state.posts = [];
    },
    updatePost(state, updatedPost) {
        // Assuming 'posts' is an array in your state
        state.posts = state.posts.map(post =>
            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
        );
    },
    setPosts(state, posts) {
        state.posts = posts;
    },
    setCurrentPost(state, post) {
        // Assuming 'currentPost' is a property in your state
        state.currentPost = post;
    },
};
export default mutations;
