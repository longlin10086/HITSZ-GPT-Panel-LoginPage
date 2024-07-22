import { ref } from 'vue';

export const UserNameError = ref(false);
export const PasswordError = ref(false);
export const ConfirmPasswordError = ref(false);
export const CodeError = ref(false);

export const isUserNameEmpty = ref(false);
export const isPasswordEmpty = ref(false);
export const isConfirmPasswordEmpty = ref(false);
export const isCodeEmpty = ref(false);

export const isUsernameLengthValid = ref(true);
export const isPasswordLengthValid = ref(true);
export const isCodeLengthValid = ref(true);

export const hasConfirmPassword = ref(false);
export const hasCode = ref(false);

export const hasLoginError = ref(false);
export const hasRegisterError = ref(false);

export const setup = () => {
    UserNameError.value = false;
    PasswordError.value = false;
    ConfirmPasswordError.value = false;
    CodeError.value = false;

    isUserNameEmpty.value = false;
    isPasswordEmpty.value = false;
    isConfirmPasswordEmpty.value = false;
    isCodeEmpty.value = false;

    isUsernameLengthValid.value = false;
    isPasswordLengthValid.value = false;
    isCodeLengthValid.value = false;

    hasLoginError.value = false;
    hasRegisterError.value = false;
}