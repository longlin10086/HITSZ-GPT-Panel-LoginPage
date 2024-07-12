import { ref } from 'vue';

export const UserNameError = ref(false);
export const PasswordError = ref(false);
export const isUserNameEmpty = ref(false);
export const isPasswordEmpty = ref(false);

export const isUsernameLengthValid = ref(true);
export const isPasswordLengthValid = ref(true);