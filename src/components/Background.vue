<script setup>
import '@/assets/images/background.png'
import Login from "@/components/Login.vue";
</script>

<template>
  <div class="background">
    <div class="content">

      <Login />
    </div>
  </div>
</template>

<style scoped>
  .background {
    background-image: url('@/assets/images/background.png');
    background-size: cover; /* 背景图片覆盖整个屏幕 */
    background-position: center; /* 背景图片居中 */
    height: 100vh; /* 设置背景高度为全屏 */
    width: 100vw; /* 设置背景宽度为全屏 */
    margin: 0; /* 去除默认的 margin */
    padding: 0; /* 去除默认的 padding */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    background: rgba(255, 255, 255, 0.2); /* 半透明白色背景 */
    backdrop-filter: blur(10px); /* 毛玻璃效果 */
    border-radius: 20px; /* 圆角 */
    padding: 20px; /* 内边距 */
    color: white; /* 文字颜色 */
    height: 100vh;
    width: 100vw; /* 响应式宽度 */
    max-width: 100vw; /* 最大宽度 */
    box-sizing: border-box; /* 包含 padding 在内的宽度计算 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 响应式设计 */
  @media (min-width: 600px) {
    .content {
      width: 100%;
    }
  }
</style>