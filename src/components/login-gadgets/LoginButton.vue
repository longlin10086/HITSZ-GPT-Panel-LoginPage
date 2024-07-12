<script setup>
import {ref} from "vue";

const onClick = () => {
  const username = ref(document.getElementById("username")?.value);
  const password = ref(document.getElementById("password")?.value);

  const regex = /^[a-zA-Z0-9]*$/;

  if (username.value && password.value) {
    if (!regex.test(username.value)){
      console.log("Please enter a valid username");
      return;
    }
    if (!regex.test(password.value)){
      console.log("Please enter a valid password");
      return;
    }
    console.log(username.value, password.value);
  }
  else {
    console.log("Oh noooooooo!");
  }
}
</script>

<template>
  <div class="LoginButton">
    <button @click="onClick" class="circle-button">
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
</style>