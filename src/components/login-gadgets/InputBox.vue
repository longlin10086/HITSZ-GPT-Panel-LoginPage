<script setup>
import { ref, computed, watch } from 'vue';
import { UserNameError, PasswordError, isPasswordEmpty, isUserNameEmpty, isUsernameLengthValid, isPasswordLengthValid } from "@/components/login-gadgets/ErrorHandler.js";

const inputValue = ref('');
const isActive = ref(false);

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

const defaultLabel = props.value;

const onFocus = () => {
  isActive.value = true;
  if (props.id === 'username') {
    UserNameError.value = false;
    isUserNameEmpty.value = false;
  } else if (props.id === 'password') {
    PasswordError.value = false;
    isPasswordEmpty.value = false;
  }
};

const onBlur = () => {
  if (inputValue.value === '') {
    isActive.value = false;
  }
};

const hasError = computed(() => {
  if (props.id === 'username') {
    return UserNameError.value
  }
  if (props.id === 'password') {
    return PasswordError.value
  }
  return false;
});

const isEmpty = computed(() => {
  if (props.id === 'username') {
    return isUserNameEmpty.value;
  }
  if (props.id === 'password') {
    return isPasswordEmpty.value;
  }
  return false;
});

// New computed property for input type
const inputType = computed(() => {
  return props.id === 'password' ? 'password' : 'text';
});

const isLengthValid = computed(() => {
  if (props.id === 'password') {
    return isPasswordLengthValid.value;
  }
  if (props.id === 'username') {
    return isUsernameLengthValid.value;
  }
  return true;
})

</script>

<template>
  <div class="input-container">
    <input
        :type="inputType"
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
            'active': isActive,
            'has-error': hasError
         }"
    >{{ isEmpty ? "内容不能为空" :
        (hasError ? (!isLengthValid ? "长度需控制在8到16个字符之间" : "请输入大小写字母与数字的组合") :
            defaultLabel) }}</label>
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
  transition: 0.5s ease all;
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