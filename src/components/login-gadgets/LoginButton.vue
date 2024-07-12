<script setup>
import { ref, defineExpose } from "vue";

import { UserNameError, PasswordError, isPasswordEmpty, isUserNameEmpty, isUsernameLengthValid, isPasswordLengthValid } from "@/components/login-gadgets/ErrorHandler.js";
import { sleep } from "@/components/LoginUtils.js";

const isWaiting = ref(false);

const onClick = async () => {
  isWaiting.value = true;
  const username = ref(document.getElementById("username")?.value);
  const password = ref(document.getElementById("password")?.value);

  isUsernameLengthValid.value = username.value.length >= 8 && username.value.length <= 16;
  isPasswordLengthValid.value = password.value.length >= 8 && password.value.length <= 16;

  const regex = /^[a-zA-Z0-9]*$/;
  let isPass = true;

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

  if (!isPass) {
    console.log(username.value, password.value);
    isWaiting.value = false;
    return;
  }
  console.log("I'm pass");

  await sleep(500);
  isWaiting.value = false;
}

</script>

<template>
  <div class="LoginButton">
    <button
        @click="onClick"
        class="circle-button"
    >
      <svg
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
          id="arrow-login"
          :class="{
          'is-waiting': isWaiting,
        }"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
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
  }

  .circle-button:hover {
    background-color: #ccc; /* Hover color */
  }

  #arrow-login.is-waiting {
    visibility: hidden;
  }
</style>