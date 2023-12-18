export default async function logout() {
  try {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Assuming that your logout endpoint is properly clearing the cookie
    console.log('Logout successful');
    // Redirect to the login page or any other route after successful logout
    // Replace '/login' with the desired route
    window.location.replace('/login');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
