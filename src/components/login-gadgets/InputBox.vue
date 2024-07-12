<script setup>
import { ref, computed, watch } from 'vue';
import { UserNameError, PasswordError } from "@/components/login-gadgets/ErrorHandler.js";

const inputValue = ref('');
const isActive = ref(false);

const onFocus = () => {
  isActive.value = true;
  if (props.id === 'username') {
    UserNameError.value = false;
  } else if (props.id === 'password') {
    PasswordError.value = false;
  }
};

const onBlur = () => {
  if (inputValue.value === '') {
    isActive.value = false;
  }
};

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const hasError = computed(() => {
  if (props.id === 'username') {
    return UserNameError.value;
  }
  if (props.id === 'password') {
    return PasswordError.value;
  }
  return false;
});

// Watch for changes in the error states and update the label text
watch(hasError, (newVal) => {
  if (newVal) {
    props.value = "请输入合法字符";
  }
});
</script>

<template>
  <div class="input-container">
    <input
        type="text"
        v-model="inputValue"
        @focus="onFocus"
        @blur="onBlur"
        :class="{
          'not-empty': inputValue !== '',
          'has-error': hasError
        }"
        :id="props.id"
    />
    <label
        :class="{
            'active': isActive || inputValue !== '',
            'has-error': hasError
         }"
    >{{ hasError ? "请输入合法字符" : props.value }}</label>
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
  transition: border-color 1s ease;
}

input.not-empty {
  padding-left: 10px;
}

input.has-error {
  border-color: red;
}

label {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
  transition: 1s ease all;
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

input.has-error + label {
  color: #E4003A; /* Ensures label color changes when input has error */
}

label.has-error {
  color: #E4003A; /* Error color for label */
}

@media (min-width: 600px) {
  .input-container {
    width: 80%;
  }
}
</style>