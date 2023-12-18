<template>
  <div>
    <div class="signup-content">
      <form @submit.prevent="submitForm" class="login-form">
        <input type="email" placeholder="Email" name="email" required v-model="email"><br><br>
        <input type="password" placeholder="Password" name="password" v-model="password" required><br><br>
        <button type="submit" id="login-button">Sign Up</button>
        <div v-if="!isPasswordValid" class="validation-message">{{ validationMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import signupService from "@/services/signup";
import { validatePassword } from "@/services/signup";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      email: '',
      password: '',
      isPasswordValid: true,
      validationMessage: '',
    };
  },
  methods: {
    async submitForm() {
      // Password validation
      const passwordValidationResult = validatePassword(this.password);

      if (passwordValidationResult !== 'Success') {
        this.isPasswordValid = false;
        this.validationMessage = passwordValidationResult;
        return;
      }

      // Sign up logic
      const { success, message } = await signupService.signUp(this.email, this.password);

      if (success) {
        // Redirect or show success message as needed
        this.$router.push("/");
      } else {
        // Handle unsuccessful signup (display an error message, etc.)
        this.validationMessage = message;
      }
    },
  }
};
</script>

<style scoped>
.signup-content {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.37);
  border-radius: 8px;
  background-color: #fff;
}

.login-form {
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

button {
  background-color: rgb(32, 248, 237);
  color: #000000;
  padding: 10px;
  border: none;
  font-weight: bold;
  font-size: large;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(22, 228, 217);
}

.validation-message {
  color: #e74c3c;
  margin-top: 10px;
  text-align: center;
}
</style>
