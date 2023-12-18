export default {
  user: { authenticated: false },
  authenticated: async function () {
    try {
      const response = await fetch("http://localhost:3000/auth/authenticate", {
        credentials: 'include',
      });
      const data = await response.json();
      this.user.authenticated = data.Authenticated; // Use consistent naming with the server response
      console.log(data);
      return this.user.authenticated;
    } catch (error) {
      console.error(error);
      console.log("Error during authentication check");
      return false;
    }
  },
};
