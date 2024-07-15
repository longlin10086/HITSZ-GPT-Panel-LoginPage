<script setup>
import {ref} from "vue";

import InputBox from "@/components/login-gadgets/InputBox.vue";
import LoginButton from "@/components/login-gadgets/LoginButton.vue";

import { hasConfirmPassword } from "@/components/login-gadgets/RulesHandler.js";

const isRegistered = ref(false);

const turnRegister = () => {
  isRegistered.value = true;
  hasConfirmPassword.value = true;
}

const turnLogin = () => {
  isRegistered.value = false;
  hasConfirmPassword.value = false;
}

</script>

<template>
  <div class="box">
    <div class="container">
      <img src="@/assets/images/logo.png" alt="logo" class="logo"/>
      <div class="input-container">
        <input-box value="用户名/邮箱" id="username" />
        <input-box value="密码" id="password" />
        <input-box v-if="isRegistered" id="confirm-password" value="确认密码" />
      </div>
      <div>
        <p v-if="!isRegistered">还没有账号？<a href="#" @click.prevent="turnRegister">点此注册</a></p>
        <p v-if="isRegistered">已有账号？<a href="#" @click.prevent="turnLogin">返回登录</a></p>
      </div>
      <LoginButton />
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box; /* Ensure padding is included in the element's width and height */
    padding: 0 10px; /* Add padding to prevent overflow */
  }

  p {
    color: #181818;
  }

  a {
    color: #555555;
    text-decoration: underline dotted;
  }

  a:hover {
    text-decoration: underline;
  }

  .logo {
    width: 50%;
    max-width: 150px;
    height: auto;
    margin-bottom: 20px;
  }

  .input-container {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box; /* Ensure padding is included in the element's width */
    padding: 0 10px; /* Add padding to prevent overflow */
  }

  .box {
    background: rgba(255, 255, 255, 1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; /* Ensure the content is centered */
    padding: 20px; /* Add padding to prevent overflow */
    margin: 10px; /* Add margin to prevent touching the edges */
  }

  /* Responsive design for small screens */
  @media (max-width: 375px) {
    .box {
      height: auto;
      padding: 15px;
      margin: 5px; /* Increase margin to prevent touching the edges */
    }

    .container {
      padding: 0 5px; /* Decrease padding for small screens */
    }
  }

  @media (max-width: 540px) and (max-height: 720px) {
    .box {
      height: auto;  /* Adjust height to auto to fit content */
      padding: 15px;
      margin: 5px; /* Add margin to prevent touching the edges */
    }

    .container {
      padding: 0 5px; /* Decrease padding for small screens */
    }

    .logo {
      width: 40%; /* Adjust logo size */
      max-width: 100px; /* Adjust max width for logo */
    }

    .input-container {
      width: 100%;
      padding: 0 5px; /* Adjust padding for input container */
    }
  }

  @media (min-width: 600px) {
    .box {
      max-width: 60vw;
    }

    .container {
      max-width: 60vw;
      max-height: 60vh;
    }
  }
</style>