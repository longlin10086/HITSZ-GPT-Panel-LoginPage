<script setup>
import InputBox from "@/components/login-gadgets/InputBox.vue";
import LoginButton from "@/components/login-gadgets/LoginButton.vue";
</script>

<template>
  <div class="box">
    <div class="container">
      <img src="@/assets/images/logo.png" alt="logo" class="logo"/>
      <div class="input-container">
        <input-box value="用户名/邮箱" id="username" />
        <input-box value="密码" id="password" />
      </div>
      <LoginButton />
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo {
    width: 50%;
    max-width: 150px; /* 最大宽度 */
    height: auto;
    margin-bottom: 20px; /* 图片和输入框之间的间距 */
  }

  .input-container {
    width: 80%; /* 输入框容器的宽度 */
  }

  .box {
    background: rgba(255, 255, 255, 1); /* 半透明白色背景 */
    backdrop-filter: blur(10px); /* 毛玻璃效果 */
    border-radius: 20px; /* 圆角 */
    height: 45vh;
    width: 90%; /* 响应式宽度 */
    max-width: 500px; /* 最大宽度 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box; /* 包含 padding 在内的宽度计算 */
    display: flex;
    justify-content: center;
  }

  /* 响应式设计 */
  @media (min-width: 600px) {
    .box {
      max-width: 60vw;
    }
  }
</style>