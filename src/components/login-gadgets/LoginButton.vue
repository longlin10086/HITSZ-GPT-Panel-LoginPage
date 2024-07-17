<script setup>
import { ref, toRefs } from "vue";
import CryptoJS from 'crypto-js';

import { UserNameError, PasswordError, isPasswordEmpty, isUserNameEmpty, ConfirmPasswordError, isConfirmPasswordEmpty, hasConfirmPassword,
  isUsernameLengthValid, isPasswordLengthValid } from "@/components/login-gadgets/RulesHandler.js";
import { sleep } from "@/components/LoginUtils.js";

const isWaiting = ref(false);
const errorMessage = ref('');

const checkRules = (isPass) => {

  const usernameElement = document.getElementById("username");
  const passwordElement = document.getElementById("password");

  const username = ref(usernameElement ? usernameElement.value : '');
  const password = ref(passwordElement ? passwordElement.value : '');
  const confirmPassword = ref('');

  if (hasConfirmPassword.value) {
    const confirmPasswordElement = document.getElementById("confirm-password");
    if (confirmPasswordElement) {
      confirmPassword.value = confirmPasswordElement.value;
    } else {
      console.error("Element with ID 'confirm-password' not found.");
      return false;
    }
  } else {
    console.log("Confirm-password is not required");
  }

  isUsernameLengthValid.value = username.value.length >= 8 && username.value.length <= 16;
  isPasswordLengthValid.value = password.value.length >= 8 && password.value.length <= 16;

  const regex = /^[a-zA-Z0-9]*$/;

  if (!username.value) {
    console.log("Username is required");
    isUserNameEmpty.value = true;
    UserNameError.value = true;
    isPass = false;
  }
  else if (!regex.test(username.value)){
    console.log("Please enter a valid username");
    UserNameError.value = true;
    isPass = false;
  }
  else if (!isUsernameLengthValid.value) {
    console.log("username's length is not feat");
    UserNameError.value = true;
    isPass = false;
  }

  if (!password.value) {
    console.log("Password is required");
    isPasswordEmpty.value = true;
    PasswordError.value = true;
    isPass = false;
  }
  else if (!regex.test(password.value)){
    console.log("Please enter a valid password");
    PasswordError.value = true;
    isPass = false;
  }
  else if (!isPasswordLengthValid.value) {
    console.log("password's length is not feat");
    PasswordError.value = true;
    isPass = false;
  }

  if (confirmPassword.value) {
    isConfirmPasswordEmpty.value = false;
    ConfirmPasswordError.value = !(confirmPassword.value === password.value);
    console.log("Confirm failed.");
    isPass = !ConfirmPasswordError.value;
  }
  else if (hasConfirmPassword.value) {
    isConfirmPasswordEmpty.value = true;
    ConfirmPasswordError.value = true;
    console.log("Confirm password is required");
    isPass = false;
  }

  return isPass;
}

const handleAuth = async (isRegister, username, password, controller) => {
  const endpoint = isRegister ? '/api/register' : '/api/login';
  console.log(endpoint);
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout


  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    signal: controller.signal
  });

  clearTimeout(timeoutId);

  const data = await response.json();
  if (response.ok) {
    console.log(data.message);
  } else {
    console.error(data.message);
  }

  return data;
}

const onClick = async () => {
  isWaiting.value = true;
  const isPass = checkRules(true);

  if (!isPass) {
    isWaiting.value = false;
    console.log("Not pass");
    return;
  }
  console.log("Validation passed");

  const username = document.getElementById("username")?.value;
  const password = document.getElementById("password")?.value;

  // Hash the password using SHA-256
  const hashedPassword = CryptoJS.SHA256(password.value).toString(CryptoJS.enc.Hex);

  const controller = new AbortController();
  try {
    const data = handleAuth(hasConfirmPassword.value, username.value, hashedPassword, controller);
    console.log('Success:', data);
  } catch (error) {
    if (error.name === 'AbortError') {
      errorMessage.value = 'Request timed out';
    } else {
      errorMessage.value = 'An error occurred';
    }
    console.error('Error:', error);
  } finally {
    isWaiting.value = false;
  }
}

</script>

<template>
  <div class="LoginButton">
    <button
        @click="onClick"
        class="circle-button"
        :class="{
        'is-waiting': isWaiting,
      }"
    >
      <svg
          v-if="!isWaiting"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-right"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 50 50"
          class="loading-circle"
      >
        <circle cx="25" cy="25" r="20" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"></circle>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.LoginButton {
  position: relative;
  width: 80%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-button {
  width: 50px; /* Adjust the size as needed */
  height: 50px;
  border-radius: 50%;
  background-color: #eee; /* Button color */
  font-size: 20px; /* Arrow size */
  color: black;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  transition: border-width 0.5s; /* Add transition for border width */
}

.circle-button:hover {
  background-color: #ccc; /* Hover color */
}

.circle-button.is-waiting {
  background-color: #fff;
  border-width: 6px; /* Bold border width when waiting */
  cursor: not-allowed; /* Change cursor to indicate it's not clickable */
}

.circle-button:disabled {
  pointer-events: none; /* Disable pointer events when button is disabled */
}

.loading-circle {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>