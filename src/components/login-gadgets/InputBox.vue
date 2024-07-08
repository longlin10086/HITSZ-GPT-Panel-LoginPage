<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const isActive = ref(false);

const onFocus = () => {
  isActive.value = true;
};

const onBlur = () => {
  if (inputValue.value === '') {
    isActive.value = false;
  }
};

const props = defineProps(['value']);

</script>

<template>
  <div class="input-container">
    <input
        type="text"
        v-model="inputValue"
        @focus="onFocus"
        @blur="onBlur"
        :class="{ 'not-empty': inputValue !== '' }"
    />
    <label :class="{ 'active': isActive || inputValue !== '' }">{{ props.value }}</label>
  </div>
</template>

<style scoped>
  .input-container {
    position: relative;
    width: 80%;
    max-width: 400px;
    margin: 20px auto;
  }

  input {
    width: 100%;
    padding: 10px 10px 10px 30px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
    backdrop-filter: blur(20px); /* 毛玻璃效果 */
  }

  input.not-empty {
    padding-left: 10px;
  }

  label {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    pointer-events: none;
    transition: 0.2s ease all;
  }

  label.active {
    top: -10px;
    left: 10px;
    font-size: 12px;
    color: #555;
  }

  input.not-empty + label {
    top: -10px;
    left: 10px;
    font-size: 12px;
    color: #555;
  }

  @media (min-width: 600px) {
    .input-container {
      width: 80%;
    }
  }
</style>