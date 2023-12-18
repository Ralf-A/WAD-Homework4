const login = async (email, password) => {
    try {
      const data = {
        email,
        password,
      };
  
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.user_id) {
        // Successful login
        return { success: true };
      } else {
        // Unsuccessful login
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'An error occurred' };
    }
  };
  
  export default login;
  