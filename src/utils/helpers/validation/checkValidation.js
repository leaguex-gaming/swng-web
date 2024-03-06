import {
  emptySpaceRegex,
  leadingSpaceRegex,
  validateNameRegex,
  validateUserNameRegex,
} from "./regex";
import { validationMessage } from "./validationMessage";

const passwordValidation = (password) => {
  if (password !== undefined && !password?.length) {
    return validationMessage.password.emptyError;
  } else if (password?.length < 5) {
    return validationMessage.password.validationError;
  } else if (password !== undefined) {
    return "";
  }
};

const contactNumberValidation = (number) => {
  if (!number?.length) {
    return validationMessage.mobile.emptyError;
  } else if (number?.length < 10) {
    return validationMessage.mobile.validationError;
  } else {
    return "";
  }
};

const otpValidation = (number) => {
  if (!number?.length) {
    return validationMessage.otp.emptyError;
  } else if (number?.length < 4) {
    return validationMessage.otp.maxError;
  } else {
    return "";
  }
};

const editProfileValidation = () => {
  const validationFunctions = {
    Name: (name) => {
      if (!name?.length) {
        return validationMessage.name.emptyError;
      } else if (!validateNameRegex(name)) {
        return validationMessage.name.alphaError;
      } else if (!leadingSpaceRegex(name)) {
        return validationMessage.name.blankSpaceError;
      } else if (name.length < 4) {
        return validationMessage.name.minError;
      } else if (name.length > 15) {
        return validationMessage.name.maxError;
      } else if (!validateNameRegex(name)) {
        return validationMessage.name.alphaError;
      } else {
        return "";
      }
    },
    Username: (userName) => {
      if (!userName?.length) {
        return validationMessage.userName.emptyError;
      } else if (!leadingSpaceRegex(userName)) {
        return validationMessage.name.blankSpaceError;
      } else if (!validateUserNameRegex(userName)) {
        return validationMessage.userName.specialCharactersError;
      } else if (!emptySpaceRegex(userName)) {
        return validationMessage.userName.whiteSpaceError;
      } else if (userName.length < 4) {
        return validationMessage.userName.minError;
      } else if (userName.length > 15) {
        return validationMessage.userName.maxError;
      } else if (!validateUserNameRegex(userName)) {
        return validationMessage.userName.specialCharactersError;
      } else if (!emptySpaceRegex(userName)) {
        return validationMessage.userName.whiteSpaceError;
      } else {
        return "";
      }
    },
    Bio: (Bio) => {
      if (Bio.length === 51) {
        return validationMessage.Bio.maxError;
      } else {
        return "";
      }
    },
  };

  return validationFunctions;
};

export {
  passwordValidation,
  contactNumberValidation,
  otpValidation,
  editProfileValidation,
};
